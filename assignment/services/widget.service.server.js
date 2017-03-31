module.exports = function(app) {
    app.post("/api/page/:pageId/widget", createWidget);
    app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.put("/api/widget/:widgetId", updateWidget);
    app.delete("/api/widget/:widgetId", deleteWidget);

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

    function createWidget(req, res) {
        var newWidget = {_id: new Date().getTime(), widgetType: req.body.type, pageId: req.params.pageId};
        widgets.push(newWidget);
        res.send(newWidget);
    }

    function findAllWidgetsForPage(req, res) {
        var wids = [];
        for (var w in widgets) {
            if (widgets[w].pageId === req.params.pageId) {
                wids.push(widgets[w]);
            }
        }
        res.send(wids);
    }

    function findWidgetById(req, res) {
        for(var w in widgets) {
            if(widgets[w]._id == req.params.widgetId) {
                res.send(widgets[w]);
                return;
            }
        }
        res.send(404);
    }

    function updateWidget(req, res) {
        var widget = req.body;
        for (var w in widgets) {
            var wid = widgets[w];
            if ( wid._id == req.params.widgetId ) {
                widgets[w].widgetType = widget.widgetType;
                widgets[w].size = widget.size;
                widgets[w].text = widget.text;
                widgets[w].width = widget.width;
                widgets[w].url = widget.url;
                res.send(200);
                return;
            }
        }
        res.send(404);
    }

    function deleteWidget(req, res) {
        for (var w in widgets) {
            var wid = widgets[w];
            if (wid._id == req.params.widgetId) {
                widgets.splice(w, 1);
                res.send(200);
                return;
            }
        }
        res.send(404);
    }
};