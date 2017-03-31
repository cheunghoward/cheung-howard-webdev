(function() {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController)
        .controller("WidgetEditController", WidgetEditController)
        .controller("WidgetNewController", WidgetNewController);

    function WidgetListController(WidgetService, $routeParams, $sce) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        vm.pageId = $routeParams["pid"];
        vm.widgetId = $routeParams["wgid"];
        vm.trustUrl = trustUrl;

        function init() {
            var promise = WidgetService.findWidgetsByPageId(vm.pageId);
            promise
                .then(function(res) {
                    vm.widgets = res.data;
                });
        }
        init();

        function trustUrl(url) {
            return $sce.trustAs($sce.RESOURCE_URL, url);
        }
    }

    function WidgetEditController(WidgetService, $routeParams, $location) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        vm.pageId = $routeParams["pid"];
        vm.widgetId = $routeParams["wgid"];
        vm.updateWidget = updateWidget;
        vm.deleteWidget = deleteWidget;

        function init() {
            var promise = WidgetService.findWidgetById(vm.widgetId);
            promise
                .then(function(res) {
                    vm.widget = res.data;
                });
        }
        init();


        function updateWidget(widget) {
            var promise = WidgetService.updateWidget(vm.widgetId, widget);
            promise
                .then(function(res) {
                        alert("widget updated");
                        $location.url('/user/' + vm.userId + '/website/' + vm.websiteId + '/page/' +
                            vm.pageId + '/widget/');
                    },
                    function(err) {
                        console.log(err);
                    });

        }

        function deleteWidget() {
            var promise = WidgetService.deleteWidget(vm.widgetId);
            promise
                .then(function(res) {
                        alert("widget deleted");
                        $location.url('/user/' + vm.userId + '/website/' + vm.websiteId + '/page/' +
                            vm.pageId + '/widget/');
                    },
                    function(err) {
                        console.log(err);
                    }
                );
        }
    }

    function WidgetNewController(WidgetService, $routeParams, $location) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        vm.pageId = $routeParams["pid"];
        vm.createWidget = createWidget;

        function init() {
            vm.widgetTypes = ["HEADING", "YOUTUBE", "IMAGE"];
        }
        init();

        function createWidget(type) {
            var promise = WidgetService.createWidget(vm.pageId, type);
            promise
                .then(function(res) {
                    var newWidget = res.data;
                    $location.url('/user/'+vm.userId+'/website/'+vm.websiteId+'/page/'+vm.pageId+'/widget/'+newWidget._id);
                },
                function(err) {
                    alert("could not create widget");
                });

        }

    }
})();