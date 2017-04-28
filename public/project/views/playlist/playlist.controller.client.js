(function() {
    angular
        .module("SpotifyPlaylistMaker")
        .controller("PlaylistListController", PlaylistListController)
        .controller("PlaylistNewController", PlaylistNewController)
        .controller("PlaylistSearchController", PlaylistSearchController)
        .controller("PlaylistDetailController", PlaylistDetailController);

    function PlaylistListController(PlaylistService, currentPlayer) {
        var vm = this;

        function init() {
            PlaylistService.findPlaylistsForPlayer(currentPlayer._id)
                .then(function(res) {
                    vm.playlists = res.data;
                });
        }
        init();
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
                    alert("song added");
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

    function PlaylistDetailController(PlaylistService, $routeParams, currentPlayer) {
        var vm = this;
        var playlistId = $routeParams['pid'];
        vm.playlistId = playlistId;
        vm.removeTrack = removeTrackFromPlaylist;

        function init() {
            vm.playlist = [];
            PlaylistService.findPlaylistById(playlistId)
                .then(function(res) {
                    vm.playlistName = res.data.name;
                    vm.playlistDescription = res.data.description;
                    var tracks = res.data.tracks;

                    // Grab Spotify data for each track in this playlist
                    for (var i in tracks) {
                        PlaylistService
                            .findTrack(tracks[i])
                            .then(function(res) {
                                var data = res.data;
                                var length = data['duration_ms'];
                                var track = {id: data['id'], title: data['name'],
                                    imageUrl: data['album']['images'][0]['url'], artists: data['artists'],
                                    length: trackLengthInMinutes(length)
                                };
                                vm.playlist.push(track);
                            });
                    }
                }, function(err) {
                    vm.error = err;
                });
        }
        init();

        function removeTrackFromPlaylist(trackId) {
            PlaylistService
                .removeTrackFromPlaylist(trackId, playlistId)
                .then(function (res) {
                    init();
                });
        }

        function trackLengthInMinutes(millis) {
            var minutes = Math.floor(millis / 60000);
            var seconds = ((millis % 60000) / 1000).toFixed(0);
            return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
        }

    }
})();