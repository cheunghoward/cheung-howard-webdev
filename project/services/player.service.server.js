module.exports = function(app, model) {
    var passport = require('passport');
    var LocalStrategy = require('passport-local').Strategy;
    passport.serializeUser(serializeUser);
    passport.use(new LocalStrategy(localStrategy));
    passport.deserializeUser(deserializeUser);

    app.post('/api/project/login', passport.authenticate('local'), login);
    app.post('/api/project/logout', logout);
    app.post('/api/project/register', register);
    app.get ('/api/project/loggedin', loggedin);
    app.get('/api/player/admin', findAllPlayers);
    app.get('/api/player', findPlayerDispatch);
    app.get('/api/player/:pid', findPlayer);
    app.put('/api/player/:pid', updatePlayer);
    app.delete('/api/player/:pid', deletePlayer);

    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

    function logout(req, res) {
        req.logOut();
        res.send(200);
    }

    function loggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function findPlayerDispatch(req, res) {
        var username = req.query['username'];
        var password = req.query['password'];
        if(username && password) {
            findPlayerByCredentials(req, res);
        } else if(username) {
            //findPlayerByUsername(req, res);
        }
    }

    function register(req, res) {
        var player = req.body;
        model.playerModel
            .createPlayer(player)
            .then(function(player){
                if(player){
                    req.login(player, function(err) {
                        if(err) {
                            res.status(400).send(err);
                        } else {
                            res.json(player);
                        }
                    });
                }
            },
            function(err) {
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

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(player, done) {
        model.playerModel
            .findPlayer(player._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }

    function localStrategy(username, password, done) {
        model.playerModel
            .findPlayerByCredentials(username, password)
            .then(
                function(player) {
                    if(player != null && player.username === username && player.password === password) {
                        return done(null, player);
                    } else {
                        return done(null, false);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            );
    }
};