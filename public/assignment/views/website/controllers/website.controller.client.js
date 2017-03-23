(function() {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController)
        .controller("WebsiteEditController", WebsiteEditController)
        .controller("WebsiteNewController", WebsiteNewController);

    function WebsiteListController(WebsiteService) {
        var vm = this;
    }

    function WebsiteEditController(WebsiteService, $routeParams) {
        var vm = this;
        vm.websiteId = $routeParams["wid"];
        function init() {
            vm.website = WebsiteService.findWebsiteById(vm.websiteId);
        }
        init();
    }

    function WebsiteNewController(WebsiteService) {
        var vm = this;
    }
})();