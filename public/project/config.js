(function () {
    angular
        .module("SpotifyPlaylistMaker")
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when("/login", {
                templateUrl: "views/player/login.view.client.html",
                controller: 'PlayerLoginController',
                controllerAs: 'model'
            })
            .when("/admin", {
                templateUrl: "views/player-list.view.client.html",
                controller: 'PlayerListController',
                controllerAs: 'model',
                // TODO: Make into checkAdmin
                resolve : { currentPlayer: checkLoggedIn }
            })
            .when("/profile/:pid/edit", {
                templateUrl: "views/player-edit.view.client.html",
                controller: 'PlayerEditController',
                controllerAs: 'model',
                resolve : { currentPlayer: checkLoggedIn }
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
            .when("/artist/:aid", {
                templateUrl: "views/artist/artist-detail.view.client.html",
                controller: 'ArtistController',
                controllerAs: 'model'
            })
            .otherwise({
                redirectTo: '/login'
            });
    }

    var checkLoggedIn = function($q, $timeout, $http, $location, $rootScope) {
        var deferred = $q.defer();
        $http.get('/api/project/loggedin')
            .then(function(user) {
                $rootScope.errorMessage = null;
                if (user.data !== '0') {
                    $rootScope.currentUser = user.data;
                    deferred.resolve(user.data);
                } else {
                    deferred.reject();
                    $location.url('/');
                }
            });
        return deferred.promise;
    };
})();