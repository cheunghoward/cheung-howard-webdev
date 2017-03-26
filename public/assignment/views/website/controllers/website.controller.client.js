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
            console.log(vm.websites);
        }
        init();
    }

    function WebsiteEditController(WebsiteService, $routeParams) {
        var vm = this;
        vm.websiteId = $routeParams["wid"];
        vm.userId = $routeParams["uid"];
        function init() {
            vm.website = WebsiteService.findWebsiteById(vm.websiteId);
            vm.websites = WebsiteService.findWebsitesByUserId(vm.userId);
            console.log(vm.websites);
        }
        init();
    }

    function WebsiteNewController(WebsiteService, $routeParams) {
        var vm = this;
        vm.websiteId = $routeParams["wid"];
        vm.userId = $routeParams["uid"];
        function init() {
            vm.website = WebsiteService.findWebsiteById(vm.websiteId);
            vm.websites = WebsiteService.findWebsitesByUserId(vm.userId);
            console.log(vm.websites);
        }
        init();
    }
})();