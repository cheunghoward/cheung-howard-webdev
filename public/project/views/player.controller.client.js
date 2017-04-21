(function() {
    angular
        .module("WebAppMaker")
        .controller("PlayerListController", PlayerListController)
        .controller("PlayerEditController", PlayerEditController);

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
            promise.then(function(_) {
                init()
            });
        }


        function deletePlayer(pid) {
            var promise = PlayerService.deletePlayer(pid);
            promise.then(function(_) {
                init()
            });
        }
    }

    function PlayerEditController(PlayerService, $routeParams) {
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
                console.log(result.data);
                vm.player = result.data;
            });
        }
    }
})();
