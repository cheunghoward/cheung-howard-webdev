(function () {
    angular
        .module("SpotifyPlaylistMaker")
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when("/login", {
                templateUrl: "views/player-list.view.client.html",
                controller: 'PlayerListController',
                controllerAs: 'model'
            })
            .when("/login/:pid", {
                templateUrl: "views/player-edit.view.client.html",
                controller: 'PlayerEditController',
                controllerAs: 'model'
            })
            .when("/playlist", {
                templateUrl: "views/playlist/playlist.view.client.html",
                controller: 'PlaylistController',
                controllerAs: 'model'
            })
            .when("/song/:sid", {
                templateUrl: "views/song/song-detail.view.client.html",
                controller: 'SongController',
                controllerAs: 'model'
            })
            .otherwise({
                redirectTo: '/login'
            });
    }
})();