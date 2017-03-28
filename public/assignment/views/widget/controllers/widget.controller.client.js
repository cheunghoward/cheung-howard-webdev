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
            vm.widgets = WidgetService.findWidgetsByPageId(vm.pageId);
        }
        init();

        function trustUrl(url) {
            return $sce.trustAs($sce.RESOURCE_URL, url);
        }
    }

    function WidgetEditController(WidgetService, $routeParams) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        vm.pageId = $routeParams["pid"];
        vm.widgetId = $routeParams["wgid"];
        vm.updateWidget = updateWidget;
        vm.deleteWidget = deleteWidget;

        function init() {
            vm.widget = WidgetService.findWidgetById(vm.widgetId);
        }
        init();


        function updateWidget(widget) {
            WidgetService.updateWidget(vm.widgetId, widget);
            console.log(widget);
            alert("widget updated");
        }

        function deleteWidget() {
            WidgetService.deleteWidget(vm.widgetId);
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
            var newWidget = WidgetService.createWidget(vm.pageId, type);
            $location.url('/user/' + vm.userId + '/website/' + vm.websiteId + '/page/' +
                vm.pageId + '/widget/' + newWidget);
        }

    }
})();