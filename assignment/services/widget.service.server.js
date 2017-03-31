module.exports = function(app, model) {
    app.post("/api/page/:pageId/widget", createWidget);
    app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.put("/api/widget/:widgetId", updateWidget);
    app.delete("/api/widget/:widgetId", deleteWidget);


    function createWidget(req,res) {
        var widget = req.body;
        var pageId = req.params['pageId'];
        var widgetCount = 0;
        model.widgetModel.findAllWidgetsForPage(pageId)
            .then(function (widgets) {
                    widgetCount = widgets.length;
                    var newWidget = {
                        "widgetType": widget.type,
                        "_page": pageId, "order": (widgetCount)
                    };
                    model.widgetModel.createWidget(pageId, newWidget)
                        .then(function (widget) {
                                res.status(200).json(widget);
                            },
                            function (err) {
                                res.sendStatus(500).send(err);
                            });
                },
                function (err) {
                });
    }

    function findAllWidgetsForPage(req,res){
        var pageId = req.params['pageId'];
        model.widgetModel.findAllWidgetsForPage(pageId)
            .then(function(widgets){
                    res.status(200).json(widgets);
                },
                function(err){
                    res.status(404).send('Page not found for id: ' + pageId);
                });
    }

    function findWidgetById(req,res){
        var widgetId = req.params['widgetId'];
        model.widgetModel.findWidgetById(widgetId)
            .then(function(widget){
                    res.status(200).json(widget);
                },
                function(err){
                    res.status(404).send('Widget not found for id: ' + widgetId);
                });
    }

    function updateWidget(req,res){
        var newWidget = req.body;
        var widgetId = req.params['widgetId'];
        var pageId = newWidget.pageId;
        model.widgetModel.updateWidget(widgetId,newWidget)
            .then(function(page){
                    res.status(200).json(page);
                },
                function(err){
                    res.status(404).send('Widget not found for id: ' + widgetId);
                });
    }

    function deleteWidget(req,res){
        var widgetId = req.params['widgetId'];
        model.widgetModel.deleteWidget(widgetId)
            .then(function(widget){
                    res.status(200).json(widget);
                },
                function(err){
                    res.status(404).send('Widget not found for id: ' + widgetId);
                });
    }
};