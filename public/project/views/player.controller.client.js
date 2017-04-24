(function() {
    angular
        .module("SpotifyPlaylistMaker")
        .controller("PlayerLoginController", PlayerLoginController)
        .controller("PlayerListController", PlayerListController)
        .controller("PlayerEditController", PlayerEditController);

    function PlayerLoginController(PlayerService, $location) {
        var vm = this;
        vm.login = login;

        function login(player) {
            var promise = PlayerService.findPlayerByCredentials(player.username, player.password);
            promise
                .then(function (player) {
                    var loginUser = player.data;
                    if(loginUser != null) {
                        $location.url('/profile/' + loginUser._id);
                        console.log(loginUser);
                    } else {
                        vm.error = 'player not found';
                    }
                }, (function(err) {
                    vm.error = 'user not found';
                }));
        }
    }

    function PlayerListController(PlayerService) {
        var vm = this;
        vm.createPlayer = createPlayer;
        vm.deletePlayer = deletePlayer;

        function init() {
            var promise = PlayerService.findAllPlayers();
            promise.then(function(res) {
                vm.players = res.data;
            });
        }
        init();

        function createPlayer(player) {
            var promise = PlayerService.createPlayer(player);
            promise.then(function(newPlayer) {
                if (newPlayer.data != null) {
                    init()
                } else {
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

    function PlayerEditController(PlayerService, $routeParams, $location) {
        var vm = this;
        vm.playerId = $routeParams["pid"];

        vm.updatePlayer = updatePlayer;
        vm.findPlayer = findPlayer;

        function init() {
            findPlayer(vm.playerId);
        }
        init();

        function updatePlayer(player) {
            var promise = PlayerService.updatePlayer(player._id, player);
            promise.then(function(_) {
                alert("player has been updated");
            });
        }

        function findPlayer(pid) {
            var promise = PlayerService.findPlayer(pid);
            promise.then(function(result) {
                vm.player = result.data;
            });
        }
    }
})();
