module.exports = function(app, model) {
    var passport = require('passport');

    var LocalStrategy = require('passport-local').Strategy;
    passport.use(new LocalStrategy(localStrategy));

    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    app.post('/api/project/login', passport.authenticate('local'), login);
    app.get ('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/project/#!/profile',
            failureRedirect: '/project/#!/login'
        }));
    app.post('/api/project/logout', logout);
    app.post('/api/project/register', register);
    app.post('/api/project/loggedin', loggedin);
    app.post('/api/project/isadmin', isAdmin);
    app.post('/api/player/:pid/makeadmin', checkAdmin, makeAdmin);
    app.post('/api/player/:pid/removeadmin', checkAdmin, removeAdmin);
    app.get('/api/player/admin', checkAdmin, findAllPlayers);
    app.get('/api/player', findPlayerDispatch);
    app.get('/api/player/:pid', findPlayer);
    app.get('/api/player/name/:name', findPlayerByName);
    app.put('/api/player/:pid', checkSameUserOrAdmin, updatePlayer);
    app.delete('/api/player/:pid', checkSameUserOrAdmin, deletePlayer);


    var facebookConfig = {
        clientID     : process.env.FACEBOOK_CLIENT_ID,
        clientSecret : process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL  : process.env.FACEBOOK_CALLBACK_URL,
        profileFields: ['id', 'displayName', 'email']
    };
    var FacebookStrategy = require('passport-facebook').Strategy;
    passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));

    function facebookStrategy(token, refreshToken, profile, done) {
        model.playerModel
            .findPlayerByFaceBookId(profile.id)
            .then(function(player) {
                if (player) {
                    return done(null, player);
                } else {
                    var email = profile.emails[0].value;
                    //var emailParts = email.split("@");
                    var newFacebookUser = {
                        name: profile.displayName,
                        email:     email,
                        facebook: {
                            id:    profile.id,
                            token: token
                        }
                    };
                    return model.playerModel.createPlayer(newFacebookUser);
                }

            })
            .then(
                function(user){
                    return done(null, user);
                },
                function(err){
                    if (err) { return done(err); }
                }
            );
    }

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

    // Handles Angular UI validation
    function isAdmin(req, res) {
        res.send(req.isAuthenticated() && req.user.role == 'admin');// ? req.user : '0');
    }

    function checkAdmin(req, res, next) {
        if(req.user && req.user.role == 'admin') {
            next();
        } else {
            res.send(401);
        }
    }

    // Ensure that user updating information is either an admin or that same user
    function checkSameUserOrAdmin(req, res, next) {
        if(req.user && req.user.role == 'admin') {
            next();
        } else if (req.user && req.user._id == req.params.pid) {
            next();
        }
        else {
            res.send(401);
        }
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

    function makeAdmin(req, res) {
        var pid = req.params.pid;
        model.playerModel.makeAdmin(pid)
            .then(function(user){
                res.sendStatus(200);
            }, function(err){
                res.status(404).send('Player not found for id: ' + pid);
            });
    }

    function removeAdmin(req, res) {
        var pid = req.params.pid;
        model.playerModel.removeAdmin(pid)
            .then(function(user){
                res.sendStatus(200);
            }, function(err){
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

    function findPlayerByName(req, res) {
        var name = req.params.name;
        model.playerModel.findPlayerByName(name)
            .then(function(players) {
                res.status(200).json(players);
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