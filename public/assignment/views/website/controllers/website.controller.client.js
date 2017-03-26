(function() {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController)
        .controller("WebsiteEditController", WebsiteEditController)
        .controller("WebsiteNewController", WebsiteNewController);

    function WebsiteListController(WebsiteService, $routeParams) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        function init() {
            vm.websites = WebsiteService.findWebsitesByUserId(vm.userId);
        }
        init();
    }

    function WebsiteEditController(WebsiteService, $routeParams) {
        var vm = this;
        vm.websiteId = $routeParams["wid"];
        vm.userId = $routeParams["uid"];
        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;

        function init() {
            vm.singleWebsite = WebsiteService.findWebsiteById(vm.websiteId);
            vm.websites = WebsiteService.findWebsitesByUserId(vm.userId);
        }
        init();

        function updateWebsite(website) {
            WebsiteService.updateWebsite(vm.websiteId, website);
        }

        function deleteWebsite() {
            WebsiteService.deleteWebsite(vm.websiteId);
        }
    }

    function WebsiteNewController(WebsiteService, $routeParams) {
        var vm = this;
        vm.websiteId = $routeParams["wid"];
        vm.userId = $routeParams["uid"];
        vm.createWebsite = createWebsite;

        function init() {
            vm.website = WebsiteService.findWebsiteById(vm.websiteId);
            vm.websites = WebsiteService.findWebsitesByUserId(vm.userId);
            console.log(vm.websites);
        }
        init();

        function createWebsite(website) {
            WebsiteService.createWebsite(vm.userId, website);
        }
    }
})();