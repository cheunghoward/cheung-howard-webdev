(function() {
    angular
        .module("SpotifyPlaylistMaker")
        .controller("PlaylistListController", PlaylistListController)
        .controller("PlaylistNewController", PlaylistNewController)
        .controller("PlaylistSearchController", PlaylistSearchController);

    function PlaylistListController(PlaylistService, currentPlayer) {
        var vm = this;
        vm.getPlaylist = getPlaylist;

        function init() {
            PlaylistService.findPlaylistsForPlayer(currentPlayer._id)
                .then(function(res) {
                    vm.playlists = res.data;
                });
        }
        init();

        function getPlaylist(playlistId) {
            for (var i in vm.playlists) {
                if (vm.playlists[i]._id == playlistId) {
                    vm.playlist = vm.playlists[i];
                    break;
                }
            }
        }
    }

    function PlaylistSearchController(PlaylistService, $routeParams) {
        var vm = this;
        vm.search = search;
        vm.addTrackToPlaylist = addTrackToPlaylist;

        function search(queryParams) {
            var searchType = queryParams.searchType;
            var promise = PlaylistService.search(queryParams.name, searchType);
            promise.then(function (res) {
                vm.searchResults = res.data;
                vm.returnType = searchType;
            });
        }

        function addTrackToPlaylist(trackId) {
            var playlistId = $routeParams['pid'];
            PlaylistService.addTrackToPlaylist(trackId, playlistId)
                .then(function (res) {
                    console.log("song added");
                });
        }
    }

    function PlaylistNewController(PlaylistService, currentPlayer) {
        var vm = this;
        vm.createPlaylist = createPlaylist;

        function createPlaylist(playlist) {
            PlaylistService.createPlaylist(currentPlayer._id, playlist)
                .then(function(res) {
                    alert("playlist created");
                });
        }
    }

})();