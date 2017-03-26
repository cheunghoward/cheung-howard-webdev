(function() {
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController)
        .controller("PageEditController", PageEditController)
        .controller("PageNewController", PageNewController);

    function PageListController(PageService, $routeParams) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        function init() {
            vm.pages = PageService.findPageByWebsiteId(vm.websiteId);
        }
        init();
    }

    function PageEditController(PageService, $routeParams) {
        var vm = this;
        vm.pageId = $routeParams["pid"];
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        function init() {
            vm.page = PageService.findPageById(vm.pageId);
        }
        init();
    }

    function PageNewController(PageService, $routeParams) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
    }
})();