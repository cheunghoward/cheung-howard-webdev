(function() {
    angular
        .module("SpotifyPlaylistMaker")
        .controller("PlayerLoginController", PlayerLoginController)
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
                        $location.url("/admin");
                        //$location.url("/profile/"+player._id);
                    },
                    function(err) {
                        vm.error = 'user not found';
                    });
        }

    }

    function PlayerListController(PlayerService, $rootScope, $location) {
        var vm = this;
        vm.createPlayer = createPlayer;
        vm.deletePlayer = deletePlayer;
        vm.logout = logout;

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

        // Register new user
        function createPlayer(player) {
            PlayerService
                .register(player)
                .then(function(response) {
                        var player = response.data;
                        if (player != null) {
                            $rootScope.currentUser = player;
                            $location.url("/profile/"+player._id);
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

    function PlayerEditController(PlayerService, $routeParams, currentPlayer) {
        var vm = this;
        vm.playerId = $routeParams["pid"];

        vm.updatePlayer = updatePlayer;
        //vm.findPlayer = findPlayer;

        function init() {
            vm.player = currentPlayer;
        }
        init();

        function updatePlayer(player) {
            var promise = PlayerService.updatePlayer(player._id, player);
            promise.then(function(_) {
                alert("player has been updated");
            });
        }
/*
        function findPlayer(pid) {
            var promise = PlayerService.findPlayer(pid);
            promise.then(function(result) {
                vm.player = result.data;
            });
        }*/
    }
})();
