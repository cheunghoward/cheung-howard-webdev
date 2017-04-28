(function () {
    angular
        .module("SpotifyPlaylistMaker")
        .factory("PlaylistService", playlistService);

    function playlistService($http) {
        var apiUrl = 'https://api.spotify.com/v1';
        var api = {
            "search": search,
            "findTrack": findTrack,
            "findArtist": findArtist,
            "findTracksForArtists": findTracksForArtist,
            "createPlaylist": createPlaylist,
            "deletePlaylist": deletePlaylist,
            "findPlaylistsForPlayer": findPlaylistsForPlayer
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

        function findTracksForArtist(artistId) {
            return $http.get(apiUrl+'/artists/'+artistId+'/top-tracks?country=US');
        }

        function createPlaylist(playerId, playlist) {
            return $http.post('/api/playlist/'+playerId+'/new', playlist);
        }

        function deletePlaylist(playlistId) {
            return $http.delete('/api/playlist/'+playlistId);
        }

        function findPlaylistsForPlayer(playerId) {
            return $http.get('/api/playlist/'+playerId);
        }
    }

})();