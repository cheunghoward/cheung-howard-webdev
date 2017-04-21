module.exports = function(app, model) {
    app.post('/api/player', createPlayer);
    app.delete('/api/player/:pid', deletePlayer);
    app.get('/api/player', findAllPlayers);

    function createPlayer(req, res) {
        var newPlayer = req.body;
        model.playerModel.createPlayer(newPlayer)
            .then(function(player){
                    res.status(200).json(player);
                },
                function(err){
                    res.sendStatus(500).send(err);
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

    function findAllPlayers(req, res) {
        model.playerModel.findAllPlayers()
            .then(function(players) {
                res.status(200).json(players);
            },
            function(err){
               res.status(404).send('Players not found');
            });
    }
};