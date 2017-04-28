module.exports = function(app, model) {
    // TODO: add authentication
    app.post('/api/playlist/:playerId/new', createPlaylist);
    app.delete('/api/playlist/:playlistId', deletePlaylist);
    app.get('/api/player/:playerId/playlist', findPlaylistsForPlayer);
    app.get('/api/playlist/:playlistId', findPlaylistById);
    app.put('/api/playlist/:playlistId/:trackId', addTrackToPlaylist);

    function createPlaylist(req, res) {
        var playlist = req.body;
        var playerId = req.params['playerId'];
        var newPlaylist = {
            'name': playlist.name,
            '_player': playerId,
            'description': playlist.description
        };
        model.playlistModel.createPlaylist(playerId, newPlaylist)
            .then(function(playlist){
                    res.status(200).json(playlist);
                },
                function(err){
                    res.sendStatus(500).send(err);
                });
    }

    function deletePlaylist(req, res) {
        var playlistId = req.params['playlistId'];
        model.playlistModel.deletePlaylist(playlistId)
            .then(function(playlist){
                    res.status(200).json(playlist);
                },
                function(err){
                    res.status(404).send('Website not found for id: ' + playlistId);
                });
    }

    function findPlaylistsForPlayer(req, res) {
        var playerId = req.params['playerId'];
        model.playlistModel.findPlaylistsForPlayer(playerId)
            .then(function(playlists){
                    res.status(200).json(playlists);
                },
                function(err){
                    res.sendStatus(500).send(err);
                });
    }

    function findPlaylistById(req, res) {
        var playlistId = req.params['playlistId'];
        model.playlistModel.findPlaylistById(playlistId)
            .then(function(playlist) {
                res.status(200).json(playlist);
            }, function(err){
                res.sendStatus(500).send(err);
            });
    }

    function addTrackToPlaylist(req, res) {
        var trackId = req.params['trackId'];
        var playlistId = req.params['playlistId'];
        model.playlistModel.addTrackToPlaylist(trackId, playlistId)
            .then(function(response) {
                res.sendStatus(200);
            }, function(err){
                res.sendStatus(500).send(err);
            });
    }
};