(function () {
    angular
        .module("WebAppMaker")
        .service("WidgetService", WidgetService);

    function WidgetService() {

        var widgets = [
            { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
            { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                "url": "https://i.kinja-img.com/gawker-media/image/upload/s--UE7cu6DV--/c_scale,fl_progressive,q_80,w_800/xoo0evqxzxrrmrn4ayoq.jpg"},
            { "_id": "567", "widgetType": "HEADING", "pageId": "432", "size": 4, "text": "Lorem ipsum"},
            { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                "url": "https://www.youtube.com/embed/vQD1Txzvq70" },
            { "_id": "789", "widgetType": "HTML", "pageId": "432", "text": "<p>Lorem ipsum</p>"}
        ];

        var counter = "5";

        var api = {
            "createWidget": createWidget,
            "findWidgetsByPageId": findWidgetsByPageId,
            "findWidgetById": findWidgetById,
            "updateWidget": updateWidget,
            "deleteWidget": deleteWidget,
        };

        return api;

        function createWidget(pageId, type) {
            var newId = ++counter;
            widgets.push({_id: newId, widgetType: type, pageId: pageId});
            return newId;
        }

        function findWidgetsByPageId(pageId) {
            var wids = [];
            for (var w in widgets) {
                if (widgets[w].pageId === pageId) {
                    wids.push(angular.copy(widgets[w]));
                }
            }
            return wids;
        }

        function findWidgetById(widgetId) {
            for(var w in widgets) {
                if(widgets[w]._id == widgetId) {
                    return angular.copy(widgets[w]);
                }
            }
            return null;
        }

        function updateWidget(widgetId, widget) {
            for (var w in widgets) {
                var wid = widgets[w];
                if ( wid._id == widgetId ) {
                    widgets[w].widgetType = widget.widgetType;
                    widgets[w].size = widget.size;
                    widgets[w].text = widget.text;
                    widgets[w].width = widget.width;
                    widgets[w].url = widget.url;
                }
            }
        }

        function deleteWidget(widgetId) {
            for (var w in widgets) {
                var wid = widgets[w];
                if (wid._id == widgetId) {
                    widgets.splice(w, 1);
                }
            }
        }
    }
})();