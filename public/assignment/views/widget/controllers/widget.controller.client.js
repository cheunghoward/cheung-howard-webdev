(function() {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController)
        .controller("WidgetEditController", WidgetEditController)
        .controller("WidgetNewController", WidgetNewController);

    function WidgetListController(WidgetService) {
        var vm = this;
    }

    function WidgetEditController(WidgetService, $routeParams) {
        var vm = this;
        vm.widgetId = $routeParams["wgid"];
        function init() {
            vm.widget = WidgetService.findWidgetById(vm.widgetId);
        }
        init();
    }

    function WidgetNewController(WidgetService) {
        var vm = this;
    }
})();