(function () {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);

    function WebsiteService() {
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
            website.developerId = userId;
            website._id = (new Date()).getTime();
            websites.push(website);
        }

        function findWebsitesByUserId(userId) {
            var sites = [];
            for(var w in websites) {
                if(websites[w].developerId === userId) {
                    sites.push(websites[w]);
                }
            }
            return sites;
        }

        function findWebsiteById(wid) {
            for(var w in websites) {
                if(websites[w]._id === wid) {
                    return angular.copy(websites[w]);
                }
            }
            return null;
        }

        function updateWebsite(websiteId, website) {
            for(var w in websites) {
                var updatedWebsite = websites[w];
                if (website._id === websiteId) {
                    websites[w].name = website.name;
                    websites[w].description = website.description;
                    websites[w].developerId = website.developerId;
                    return updatedWebsite;
                }
            }
            return null;
        }

        function deleteWebsite(websiteId) {
            for(var w in websites) {
                if(websites[w]._id === websiteId) {
                    websites.splice(w, 1);
                }
            }
        }


    }
})();