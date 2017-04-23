(function() {
    angular
        .module("SpotifyPlaylistMaker")
        .controller("SongController", SongController);

    function SongController(PlaylistService, $routeParams) {
        var vm = this;
        vm.songId = $routeParams['sid'];

        function init() {
            PlaylistService
                .findTrack(vm.songId)
                .then(function(res) {
                    var data = res.data;
                    vm.title = data['name'];
                    vm.imageUrl = data['album']['images'][0]['url'];
                    vm.artists = data['artists'];
                });
        }
        init();

    }
})();