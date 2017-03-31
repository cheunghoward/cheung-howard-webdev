module.exports = function(app, model) {
    app.post("/api/website/:websiteId/page", createPage);
    app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
    app.get("/api/page/:pageId", findPageById);
    app.put("/api/page/:pageId", updatePage);
    app.delete("/api/page/:pageId", deletePage);

    function createPage(req,res){
        var page = req.body;
        var websiteId = req.params['websiteId'];
        var userId = req.params['userId'];
        var newPage = {"name": page.name,
            "_website": websiteId, "description": page.description};

        model.pageModel.createPage(websiteId,newPage)
            .then(function(page){
                    res.status(200).json(page);
                },
                function(err){
                    res.sendStatus(500).send(err);
                });
    }

    function findAllPagesForWebsite(req,res){
        var websiteId = req.params['websiteId'];
        var userId = req.params['userId'];
        model.pageModel.findAllPagesForWebsite(websiteId)
            .then(function(pages){
                    res.status(200).json(pages);
                },
                function(err){
                    res.status(404).send('Website not found for id: ' + websiteId);
                });
    }

    function findPageById(req,res){
        var pageId = req.params['pageId'];
        model.pageModel.findPageById(pageId)
            .then(function(page){
                    res.status(200).json(page);
                },
                function(err){
                    res.status(404).send('Page not found for id: ' + pageId);
                });
    }

    function updatePage(req,res){
        var newPage = req.body;
        var pageId = req.params['pageId'];
        model.pageModel.updatePage(pageId,newPage)
            .then(function(page){
                    res.status(200).json(page);
                },
                function(err){
                    res.status(404).send('Page not found for id: ' + pageId);
                });
    }

    function deletePage(req,res){
        var pageId = req.params['pageId'];
        model.pageModel.deletePage(pageId)
            .then(function(page){
                    res.status(200).json(page);
                },
                function(err){
                    res.status(404).send('Page not found for id: ' + pageId);
                });
    }
};