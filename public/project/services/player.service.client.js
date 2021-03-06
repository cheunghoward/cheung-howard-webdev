(function () {
    angular
        .module("SpotifyPlaylistMaker")
        .factory("PlayerService", playerService);

    function playerService($http) {
        var api = {
            "register": register,
            "deletePlayer": deletePlayer,
            "findAllPlayers": findAllPlayers,
            "updatePlayer": updatePlayer,
            "findPlayer": findPlayer,
            //"findPlayerByCredentials": findPlayerByCredentials,
            "findPlayerByName": findPlayerByName,
            "makeAdmin": makeAdmin,
            "removeAdmin": removeAdmin,
            "login" : login,
            "logout" : logout
        };

        return api;

        function login(user) {
            return $http.post("/api/project/login", user);
        }

        function logout(user) {
            return $http.post("/api/project/logout");
        }

        function register(player) {
            return $http.post('/api/project/register', player);
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

        function findPlayerByName(name) {
            return $http.get('/api/player/name/'+name);
        }

        function makeAdmin(pid) {
            return $http.post('/api/player/'+pid+'/makeadmin');
        }

        function removeAdmin(pid) {
            return $http.post('/api/player/'+pid+'/removeadmin');
        }
/*
        function findPlayerByCredentials(username, password) {
            return $http.get("/api/player?username="+username+"&password="+password);
        }*/
    }

})();