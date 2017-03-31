module.exports = function (app, model) {
    app.get("/api/user", findUser);
    app.get("/api/user?username=username", findUserByUsername);
    app.get("/api/user?username=username&password=password", findUserByCredentials);
    app.get("/api/user/:userId", findUserByUserId);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);
    app.post("/api/user", createUser);

    function deleteUser(req, res) {
        var userId = req.params.userId;
        model.userModel.deleteUser(userId)
            .then(function(user){
                    res.status(200).json(user);
                },
                function(err){
                    res.status(404).send('User not found for id: ' + userId);
                });
    }

    function createUser(req, res) {
        var newUser = req.body;
        model.userModel.createUser(newUser)
            .then(function(user){
                    res.status(200).json(user);
                },
                function(err){
                    res.sendStatus(500).send(err);
                });
    }

    function updateUser(req, res) {
        var userId = req.params['userId'];
        var newUser = req.body;
        model.userModel.updateUser(userId, newUser)
            .then(function(user){
                    res.status(200).json(user);
                },
                function(err){
                    res.status(404).send('User not found for id: ' + userId);
                });

    }

    function findUserByUserId(req, res) {
        var userId = req.params['userId'];
        model.userModel.findUserById(userId)
            .then(function(user){
                    res.status(200).json(user);
                },
                function(err){
                    res.status(404).send('User not found for id: ' + userId);
                });
    }

    function findUser(req, res) {
        var username = req.query['username'];
        var password = req.query['password'];
        if(username && password) {
            findUserByCredentials(req, res);
        } else if(username) {
            findUserByUsername(req, res);
        }
    }

    function findUserByUsername(req, res) {
        var username = req.query['username'];
        model.userModel.findUserByUsername(username)
            .then(function(user){
                    res.status(200).json(user);
                },
                function(err){
                    res.sendStatus(404).send('User not found for username: ' + username);
                });
        res.status(404)
    }

    function findUserByCredentials(req, res){
        var username = req.query['username'];
        var password = req.query['password'];
        model.userModel.findUserByCredentials(username, password)
            .then(function(user){
                    res.status(200).json(user);
                },
                function(err){
                    res.status(404).send('User not found for username: ' + username + ' and password: ' + password);
                });
    }
};