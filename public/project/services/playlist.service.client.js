(function () {
    angular
        .module("SpotifyPlaylistMaker")
        .factory("PlaylistService", playlistService);

    function playlistService($http) {
        var apiUrl = 'https://api.spotify.com/v1';
        var api = {
            "search": search,
            "findTrack": findTrack,
            "findArtist": findArtist
        };

        return api;

        function search(name, searchType) {
            return $http.get(apiUrl+'/search?q='+name+'&type='+searchType+'&limit=10');
        }

        function findTrack(songId) {
            return $http.get(apiUrl+'/tracks/'+songId);
        }

        function findArtist(artistId) {
            return $http.get(apiUrl+'/artists/'+artistId);
        }

    }

})();