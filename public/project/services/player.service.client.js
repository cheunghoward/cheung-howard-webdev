(function () {
    angular
        .module("WebAppMaker")
        .factory("PlayerService", playerService);

    function playerService($http) {
        var api = {
            "createPlayer": createPlayer,
            "deletePlayer": deletePlayer,
            "findAllPlayers": findAllPlayers,
            "updatePlayer": updatePlayer,
            "findPlayer": findPlayer
        };

        return api;

        function createPlayer(player) {
            return $http.post('/api/player', player);
        }

        function deletePlayer(pid) {
            return $http.delete('/api/player/'+pid);
        }

        function updatePlayer(pid, player) {
            return $http.put('/api/player/'+pid, player);
        }

        function findAllPlayers() {
            return $http.get('/api/player');
        }

        function findPlayer(pid) {
            return $http.get('/api/player/'+pid);
        }
    }

})();