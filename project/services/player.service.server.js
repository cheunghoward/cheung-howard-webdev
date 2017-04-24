module.exports = function(app, model) {
    app.get('/api/player/admin', findAllPlayers);
    app.get('/api/player', findPlayerDispatch);
    app.get('/api/player/:pid', findPlayer);
    app.get('/api/player?username=username&password=password', findPlayerByCredentials);
    app.put('/api/player/:pid', updatePlayer);
    app.delete('/api/player/:pid', deletePlayer);
    app.post('/api/player', createPlayer);

    function findPlayerDispatch(req, res) {
        var username = req.query['username'];
        var password = req.query['password'];
        if(username && password) {
            findPlayerByCredentials(req, res);
        } else if(username) {
            //findPlayerByUsername(req, res);
        }
    }

    function createPlayer(req, res) {
        var newPlayer = req.body;
        model.playerModel.createPlayer(newPlayer)
            .then(function(player){
                    res.status(200).json(player);
                },
                function(err){
                    if (err.code == 11000 && err.name == 'MongoError') {
                        res.status(200).json(null);
                    } else {
                        res.sendStatus(500).send(err);
                    }
                });
    }

    function deletePlayer(req, res) {
        var pid = req.params.pid;
        model.playerModel.deletePlayer(pid)
            .then(function(user){
                    res.status(200).json(user);
                },
                function(err){
                    res.status(404).send('Player not found for id: ' + pid);
                });
    }

    function updatePlayer(req, res) {
        var pid = req.params.pid;
        var newPlayer = req.body;
        model.playerModel.updatePlayer(pid, newPlayer)
            .then(function(player){
                res.status(200).json(player);
            },
            function(err) {
                res.sendStatus(500).send(err);
            });
    }

    function findAllPlayers(_, res) {
        model.playerModel.findAllPlayers()
            .then(function(players) {
                    res.status(200).json(players);
            },
            function(err){
                res.status(404).send('Players not found');
            });
    }

    function findPlayer(req, res) {
        var pid = req.params.pid;
        model.playerModel.findPlayer(pid)
            .then(function(player) {
                res.status(200).json(player);
            },
            function(err) {
                res.status(404).send('Player not found');
            });
    }


    function findPlayerByCredentials(req, res){
        var username = req.query['username'];
        var password = req.query['password'];
        model.playerModel.findPlayerByCredentials(username, password)
            .then(function(player){
                    res.status(200).json(player);
                },
                function(err){
                    res.status(404).send('Player not found for username: ' + username + ' and password: ' + password);
                });
    }
};