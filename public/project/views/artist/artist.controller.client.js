(function() {
    angular
        .module("SpotifyPlaylistMaker")
        .controller("ArtistController", ArtistController);

    function ArtistController(PlaylistService, $routeParams) {
        var vm = this;
        var artistId = $routeParams['aid'];

        function init() {
            PlaylistService
                .findArtist(artistId)
                .then(function(res) {
                    var data = res.data;
                    vm.imageUrl = data['images'][0]['url'];
                    vm.name = data['name'];
                });

            PlaylistService
                .findTracksForArtists(artistId)
                .then(function(res) {
                    var data = res.data.tracks;
                    var result = [];
                    for (var d in data) {
                        var item = data[d];
                        result.push({name: item.name, id: item.id, length: item.duration_ms, imageUrl: item.album.images[0].url});
                    }
                    vm.tracks = result;
                });

        }
        init();


    }
})();