(function () {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);

    function WebsiteService($http) {
        var websites = [
            { "_id": "123", "name": "Facebook",    "developerId": "1", "description": "Lorem", created: new Date() },
            { "_id": "234", "name": "Tweeter",     "developerId": "4", "description": "Lorem", created: new Date() },
            { "_id": "456", "name": "Gizmodo",     "developerId": "2", "description": "Lorem", created: new Date() },
            { "_id": "567", "name": "Tic Tac Toe", "developerId": "2", "description": "Lorem", created: new Date() },
            { "_id": "678", "name": "Checkers",    "developerId": "2", "description": "Lorem", created: new Date() },
            { "_id": "789", "name": "Chess",       "developerId": "3", "description": "Lorem", created: new Date() }
        ];
        var api = {
            "createWebsite": createWebsite,
            "findWebsitesByUserId": findWebsitesByUserId,
            "findWebsiteById": findWebsiteById,
            "updateWebsite": updateWebsite,
            "deleteWebsite": deleteWebsite,
        };
        return api;

        function createWebsite(userId, website) {
            return $http.post('/api/user/'+userId+'/website', website);
        }

        function findWebsitesByUserId(userId) {
            return $http.get('/api/user/'+userId+'/website');
        }

        function findWebsiteById(wid) {
            return $http.get("/api/website/"+wid);
        }

        function updateWebsite(websiteId, website) {
            return $http.put("/api/website/"+websiteId, website);
        }

        function deleteWebsite(websiteId) {
            return $http.delete("/api/website/"+websiteId);
        }


    }
})();