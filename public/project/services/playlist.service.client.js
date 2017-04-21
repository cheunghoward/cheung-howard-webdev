(function () {
    angular
        .module("SpotifyPlaylistMaker")
        .factory("PlaylistService", playlistService);

    function playlistService($http) {
        var api = {
            "search": search
        };

        return api;

        function search(name, searchType) {
            //console.log(queryParams);
            return $http.get('https://api.spotify.com/v1/search?q='+name+'&type='+searchType);
        }

    }

})();