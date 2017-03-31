module.exports = function(app) {
    app.post("/api/user/:userId/website", createWebsite);
    app.get("/api/user/:userId/website", findAllWebsitesForUser);
    app.get("/api/website/:websiteId", findWebsiteById);
    app.put("/api/website/:websiteId", updateWebsite);
    app.delete("/api/website/:websiteId", deleteWebsite);

    var websites = [
        { "_id": "123", "name": "Facebook",    "developerId": "1", "description": "Lorem", created: new Date() },
        { "_id": "234", "name": "Tweeter",     "developerId": "4", "description": "Lorem", created: new Date() },
        { "_id": "456", "name": "Gizmodo",     "developerId": "2", "description": "Lorem", created: new Date() },
        { "_id": "567", "name": "Tic Tac Toe", "developerId": "2", "description": "Lorem", created: new Date() },
        { "_id": "678", "name": "Checkers",    "developerId": "2", "description": "Lorem", created: new Date() },
        { "_id": "789", "name": "Chess",       "developerId": "3", "description": "Lorem", created: new Date() }
    ];

    function createWebsite(req, res) {
        var website = req.body;
        website.developerId = req.params.userId;
        website._id = (new Date()).getTime();
        websites.push(website);
        res.json(website);
    }

    function findAllWebsitesForUser(req, res) {
        var sites = [];
        for(var w in websites) {
            if(websites[w].developerId === req.params.userId) {
                sites.push(websites[w]);
            }
        }
        res.send(sites);
    }

    function findWebsiteById(req, res) {
        for(var w in websites) {
            if(websites[w]["_id"] == req.params.websiteId) {
                res.json(websites[w]);
            }
        }
        res.sendStatus(404);
    }

    function updateWebsite(req, res) {
        var website = req.body;
        for(var w in websites) {
            var updatedWebsite = websites[w];
            if (updatedWebsite._id === req.params.websiteId) {
                websites[w].name = website.name;
                websites[w].description = website.description;
                res.sendStatus(200);
            }
        }
        res.sendStatus(404);
    }

    function deleteWebsite(req, res) {
        for(var w in websites) {
            if(websites[w]._id == req.params.websiteId) {
                websites.splice(w, 1);
                res.sendStatus(200);
            }
        }
        res.sendStatus(404);
    }
};