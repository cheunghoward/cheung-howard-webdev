(function() {
    angular
        .module("SpotifyPlaylistMaker")
        .controller("PlaylistController", PlaylistController);

    function PlaylistController(PlaylistService) {
        var vm = this;
        vm.search = search;

        function init() {

        }
        init();

        function search(queryParams) {
            var searchType = queryParams.searchType;
            var promise = PlaylistService.search(queryParams.name, searchType);
            promise.then(function (res) {
               vm.searchResults = res.data;
               vm.returnType = searchType;
            });
        }
    }
})();