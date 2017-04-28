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
            .when("/register", {
                templateUrl: "views/player/player-register-template.view.client.html",
                controller: 'PlayerListController',
                controllerAs: 'model'
            })
            .when("/admin", {
                templateUrl: "views/player-list.view.client.html",
                controller: 'PlayerListController',
                controllerAs: 'model',
                resolve : { currentPlayer: checkLoggedIn, adminUser: isAdmin }
            })
            .when("/profile", {
                templateUrl: "views/player/player-profile.view.client.html",
                controller: 'PlayerProfileController',
                controllerAs: 'model',
                resolve : { currentPlayer: checkLoggedIn}
            })
            .when("/profile/:pid", {
                templateUrl: "views/player/player-profile.view.client.html",
                controller: 'PlayerProfileController',
                controllerAs: 'model',
                resolve : { currentPlayer: checkLoggedIn}
            })
            .when("/profile/:pid/edit", {
                templateUrl: "views/player-edit.view.client.html",
                controller: 'PlayerEditController',
                controllerAs: 'model',
                resolve : { currentPlayer: checkLoggedIn, isAdmin: isAdmin }
            })
            .when("/playlist", {
                templateUrl: "views/playlist/playlist-list.view.client.html",
                controller: 'PlaylistListController',
                controllerAs: 'model',
                resolve : { currentPlayer: checkLoggedIn }
            })
            .when("/playlist/:pid", {
                templateUrl: "views/playlist/playlist-detail.view.client.html",
                controller: 'PlaylistDetailController',
                controllerAs: 'model',
                resolve : { currentPlayer: checkLoggedIn }
            })
            .when("/playlist/:pid/search", {
                templateUrl: "views/playlist/playlist-search.view.client.html",
                controller: 'PlaylistSearchController',
                controllerAs: 'model'
            })
            .when("/playlist/new", {
                templateUrl: "views/playlist/playlist-new.view.client.html",
                controller: 'PlaylistNewController',
                controllerAs: 'model',
                resolve : { currentPlayer: checkLoggedIn }
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

    var isAdmin = function($q, $timeout, $http, $location, $rootScope) {
        var deferred = $q.defer();
        $http.post('/api/project/isadmin')
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

    var checkLoggedIn = function($q, $timeout, $http, $location, $rootScope) {
        var deferred = $q.defer();
        $http.post('/api/project/loggedin')
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