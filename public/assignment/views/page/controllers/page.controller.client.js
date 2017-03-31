(function() {
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController)
        .controller("PageEditController", PageEditController)
        .controller("PageNewController", PageNewController);

    function PageListController(PageService, $routeParams, $location) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];

        function init() {
            var promise = PageService.findPageByWebsiteId(vm.websiteId);
            promise
                .then(function (res) {
                    vm.pages = res.data;
                });
        }
        init();
    }

    function PageEditController(PageService, $routeParams, $location) {
        var vm = this;
        vm.pageId = $routeParams["pid"];
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        vm.updatePage = updatePage;
        vm.deletePage = deletePage;

        function init() {
            var promise = PageService.findPageById(vm.pageId);
            promise
                .then(function(res) {
                    vm.page = res.data;
                });
        }
        init();

        function updatePage(page) {
            var promise = PageService.updatePage(vm.pageId, page);
            promise
                .then(function (res) {
                    alert("page has been updated");
                    $location.url('/user/'+vm.userId+'/website/'+vm.websiteId
                        +'/page');
                },
                function (err) {
                    console.log(err);
                });
        }

        function deletePage() {
            var promise = PageService.deletePage(vm.pageId);
            promise
                .then(function (res) {
                    alert("page has been deleted");
                    $location.url('/user/'+vm.userId+'/website/'+vm.websiteId
                        +'/page');
                },
                function (err) {
                    console.log(err);
                });
        }
    }

    function PageNewController(PageService, $routeParams, $location) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        vm.createPage = createPage;

        function createPage(page) {
            PageService.createPage(vm.websiteId, page);
            $location.url('/user/'+vm.userId+'/website/'+vm.websiteId
                +'/page');
        }
    }
})();