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
            { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": '<p>Anker’s kevlar-reinforced PowerLine cables are ' +
            '<a href="http://gear.lifehacker.com/your-favorite-lightning-cables-anker-powerline-and-pow-1782036601" target="_blank" rel="noopener">' +
            'far and away our readers’ top choice for charging their gadgets</a>, and you can save on several models today, including some from the nylon-wrapped PowerLine+ collection. ' +
            'I use these cables every single day, and I’ve never had one fray or stop working. Just be sure to note the promo codes below.<br></p>'},
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

        function createWidget(pageId, widget) {
            widgets.push({_id: counter++, widgetType: widget.widgetType, pageId: pageId, size: widget.size, text: widget.text, width: widget.width});
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
                if(widgets[w]._id === widgetId) {
                    return angular.copy(widgets[w]);
                }
            }
            return null;
        }

        function updateWidget(widgetId, widget) {
            for (var w in widgets) {
                var wid = widgets[w];
                if ( wid._id === widgetId ) {
                    widgets[w].widgetType = widget.widgetType;
                    widgets[w].pageId = widget.pageId;
                    widgets[w].size = widget.size;
                    widgets[w].text = widget.text;
                    widgets[w].width = widget.width;
                }
            }
        }

        function deleteWidget(widgetId) {
            for (var w in widgets) {
                var wid = widgets[w];
                if (wid._id === widgetId) {
                    widgets.remove(w);
                }
            }
        }
    }
})();