module.exports = function(app) {
    app.post("/api/website/:websiteId/page", createPage);
    app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
    app.get("/api/page/:pageId", findPageById);
    app.put("/api/page/:pageId", updatePage);
    app.delete("/api/page/:pageId", deletePage);

    var pages = [
        { "_id": "321", "name": "Post 1", "websiteId": "456", "title": "Lorem" },
        { "_id": "432", "name": "Post 2", "websiteId": "567", "title": "Lorem" },
        { "_id": "543", "name": "Post 3", "websiteId": "567", "title": "Lorem" }
    ];

    function createPage(req, res) {
        var page = req.body;
        pages.push(
            {
                _id: (new Date()).getTime(),
                name: page.name,
                websiteId: req.params.websiteId,
                title: page.title,
            });
        res.json(page);
    }

    function findAllPagesForWebsite(req, res) {
        var ps = [];
        for (var p in pages) {
            var page = pages[p];
            if (page.websiteId === req.params.websiteId) {
                ps.push(page);
            }
        }
        res.send(ps);
    }

    function findPageById(req, res) {
        for (var p in pages) {
            var page = pages[p];
            if (page._id == req.params.pageId) {
                res.json(page);
                return;
            }
        }
        res.sendStatus(404);
    }

    function updatePage(req, res) {
        var page = req.body;
        for (var p in pages) {
            if (pages[p]._id === req.params.pageId) {
                pages[p].websiteId = page.websiteId;
                pages[p].name = page.name;
                pages[p].title = page.title;
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);
    }

    function deletePage(req, res) {
        for (var p in pages) {
            if (pages[p]._id == req.params.pageId) {
                pages.splice(p, 1);
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);
    }
};