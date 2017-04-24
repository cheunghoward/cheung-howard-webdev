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
        }
        init();


    }
})();