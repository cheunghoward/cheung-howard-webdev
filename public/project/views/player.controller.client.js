(function() {
    angular
        .module("SpotifyPlaylistMaker")
        .controller("PlayerLoginController", PlayerLoginController)
        .controller("PlayerProfileController", PlayerProfileController)
        .controller("PlayerListController", PlayerListController)
        .controller("PlayerEditController", PlayerEditController);

    function PlayerLoginController(PlayerService, $rootScope, $location) {
        var vm = this;
        vm.login = login;
        //vm.logout = logout;

        function login(player) {
            PlayerService
                .login(player)
                .then(
                    function(response) {
                        var player = response.data;
                        $rootScope.currentUser = player;
                        $location.url("/profile/"+player._id);
                    },
                    function(err) {
                        vm.error = 'user not found';
                    });
        }
    }

    function PlayerProfileController(PlayerService, $routeParams, $rootScope, $location, currentPlayer) {
        var vm = this;
        var pid = $routeParams['pid'];
        vm.currentPlayer = currentPlayer;

        // If user navigates to /profile, redirect to their own profile.
        if (!pid) {
            $location.url('/profile/'+currentPlayer._id);
        }

        vm.logout = logout;

        PlayerService
            .findPlayer(pid)
            .then(function(res) {
                vm.profilePlayer = res.data;
            });


        function logout() {
            PlayerService
                .logout()
                .then(function(response) {
                    $rootScope.currentUser = null;
                    $location.url("/");
                });
        }
    }

    function PlayerListController(PlayerService, $rootScope, $location) {
        var vm = this;
        vm.createPlayer = createPlayer;
        vm.deletePlayer = deletePlayer;
        vm.logout = logout;
        vm.filterPlayers = filterPlayers;

        function logout() {
            PlayerService
                .logout()
                .then(function(response) {
                    $rootScope.currentUser = null;
                    $location.url("/");
                });
        }

        function init() {
            var promise = PlayerService.findAllPlayers();
            promise.then(function(res) {
                vm.players = res.data;
            });
        }
        init();

        function filterPlayers(query) {
            if (query == '') {
                init();
            }
            PlayerService
                .findPlayerByName(query)
                .then(function(response) {
                    vm.players = response.data;
                });
        }

        // Register new user
        function createPlayer(player) {
            PlayerService
                .register(player)
                .then(function(response) {
                        var player = response.data;
                        if (player != null) {
                            $rootScope.currentUser = player;
                            //$location.url("/profile/"+player._id+"/edit");
                            init();
                        } else {
                            // Server sends back a 200 with null data when the username is taken
                            vm.error = 'Username already exists';
                        }
                }, (function(err) {
                    vm.error = 'Internal server error';
                }));
        }

        function deletePlayer(pid) {
            var promise = PlayerService.deletePlayer(pid);
            promise.then(function(_) {
                init()
            });
        }
    }

    function PlayerEditController(PlayerService, $routeParams, isAdmin) {
        var vm = this;
        vm.playerId = $routeParams["pid"];
        vm.makeAdmin = makeAdmin;
        vm.removeAdmin = removeAdmin;
        vm.logout = logout;

        vm.updatePlayer = updatePlayer;
        vm.isAdmin = isAdmin;
        //vm.findPlayer = findPlayer;

        function init() {
            //vm.player = currentPlayer;
            findPlayer(vm.playerId);
        }
        init();

        function updatePlayer(player) {
            var promise = PlayerService.updatePlayer(player._id, player);
            promise.then(function(_) {
                alert("player has been updated");
            }, function(err) {
                vm.error = err;
            });
        }

        function findPlayer(pid) {
            var promise = PlayerService.findPlayer(pid);
            promise.then(function(result) {
                vm.player = result.data;
            });
        }

        function makeAdmin(pid) {
            var promise = PlayerService.makeAdmin(pid);
            promise.then(function(result) {
                init();
                vm.success = "Successfully made admin";
            }, function(err) {
                vm.error = err;
            });
        }

        function removeAdmin(pid) {
            var promise = PlayerService.removeAdmin(pid);
            promise.then(function(result) {
                init();
                vm.success = "Successfully removed admin";
            }, function(err) {
                vm.error = err;
            });
        }

        function logout() {
            PlayerService
                .logout()
                .then(function(response) {
                    $rootScope.currentUser = null;
                    $location.url("/");
                });
        }
    }
})();
