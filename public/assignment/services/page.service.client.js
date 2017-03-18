(function(){
   angular
       .module("WebAppMaker")
       .factory('PageService', pageService);

   function pageService() {
       var pages = [
           { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
           { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
           { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
       ];

       var api = {
           "createPage": createPage,
           "findPageByWebsiteId": findPageByWebsiteId,
           "findPageById": findPageById,
           "updatePage": updatePage,
           "deletePage": deletePage,
       };
       return api;

       function createPage(websiteId, page){
           pages.push(
               {
                   _id: (new Date()).getTime(),
                   name: page.name,
                   websiteId: websiteId,
                   description: page.description,
           });
       }

       function findPageByWebsiteId(websiteId) {
           var ps = {};
           for (var p in pages) {
               var page = pages[p];
               if (page.websiteId === websiteId) {
                   ps.push(angular.copy(page));
               }
           }
           return ps;
       }

       function findPageById(pageId) {
           for (var p in pages) {
               var page = pages[p];
               if (page._id === pageId) {
                   return angular.copy(page);
               }
           }
           return null;
       }

       function updatePage(pageId, page) {
           for (var p in pages) {
               if (pages[p].pageId === pageId) {
                   pages[p].websiteId = page.websiteId;
                   pages[p].name = page.name;
                   pages[p].description = page.description;
               }
           }
       }

       function deletePage(pageId) {
           for (var p in pages) {
               if (pages[p].pageId === pageId) {
                   pages.remove(p);
               }
           }
       }
   }
})();