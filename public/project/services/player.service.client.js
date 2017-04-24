(function () {
    angular
        .module("SpotifyPlaylistMaker")
        .factory("PlayerService", playerService);

    function playerService($http) {
        var api = {
            "createPlayer": createPlayer,
            "deletePlayer": deletePlayer,
            "findAllPlayers": findAllPlayers,
            "updatePlayer": updatePlayer,
            "findPlayer": findPlayer,
            "findPlayerByCredentials": findPlayerByCredentials
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
            return $http.get('/api/player/admin');
        }

        function findPlayer(pid) {
            return $http.get('/api/player/'+pid);
        }

        function findPlayerByCredentials(username, password) {
            return $http.get("/api/player?username="+username+"&password="+password);
        }
    }

})();