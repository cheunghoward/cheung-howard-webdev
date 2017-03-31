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
            var promise = WebsiteService.findWebsitesByUserId(vm.userId);
            promise
                .then(function(res) {
                    vm.websites = res.data;
                });
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
            var promise = WebsiteService.findWebsiteById(vm.websiteId);
            promise
                .then(function(res) {
                    vm.singleWebsite = res.data;
                });
            var websitesPromise = WebsiteService.findWebsitesByUserId(vm.userId);
            websitesPromise
                .then(function(res) {
                    vm.websites = res.data;
                });
        }
        init();

        function updateWebsite(website) {
            var promise = WebsiteService.updateWebsite(vm.websiteId, website);
            promise
                .then(
                    function(res){
                        alert("Successfully updated website");
                    },
                    function(err) {
                        console.log(err);
                    }
                );
        }

        function deleteWebsite() {
            var promise = WebsiteService.deleteWebsite(vm.websiteId);
            promise
                .then(
                    function(res){
                        alert("Successfully deleted website");
                    },
                    function(err) {
                        console.log(err);
                    }
                );
        }
    }

    function WebsiteNewController(WebsiteService, $routeParams, $location) {
        var vm = this;
        vm.websiteId = $routeParams["wid"];
        vm.userId = $routeParams["uid"];
        vm.createWebsite = createWebsite;

        function init() {
            var websitesPromise = WebsiteService.findWebsitesByUserId(vm.userId);
            websitesPromise.then(function(res) {
                vm.websites = res.data;
            })
        }
        init();

        function createWebsite(website) {
            WebsiteService.createWebsite(vm.userId, website);
            $location.url('#!/user/'+vm.userId+'/website');
        }
    }
})();