(function () {
    angular
        .module("WebAppMaker")
        .service("WidgetService", WidgetService);

    function WidgetService($http) {

        var api = {
            "createWidget": createWidget,
            "findWidgetsByPageId": findWidgetsByPageId,
            "findWidgetById": findWidgetById,
            "updateWidget": updateWidget,
            "deleteWidget": deleteWidget,
        };

        return api;

        function createWidget(pageId, type) {
            return $http.post("/api/page/"+pageId+"/widget", type);
        }

        function findWidgetsByPageId(pageId) {
            return $http.get("/api/page/"+pageId+"/widget");
        }

        function findWidgetById(widgetId) {
            return $http.get("/api/widget/"+widgetId);
        }

        function updateWidget(widgetId, widget) {
            return $http.put("/api/widget/"+widgetId, widget);
        }

        function deleteWidget(widgetId) {
            return $http.put("/api/widget/"+widgetId);
        }
    }
})();