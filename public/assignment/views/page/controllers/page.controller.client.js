(function() {
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController)
        .controller("PageEditController", PageEditController)
        .controller("PageNewController", PageNewController);

    function PageListController(PageService) {
        var vm = this;
    }

    function PageEditController(PageService, $routeParams) {
        var vm = this;
        vm.pageId = $routeParams["pid"];
        function init() {
            vm.page = PageService.findPageById(vm.pageId);
        }
        init();
    }

    function PageNewController(PageService) {
        var vm = this;
    }
})();