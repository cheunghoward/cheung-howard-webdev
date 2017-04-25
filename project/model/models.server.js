module.exports = function() {
    var mongoose = require('mongoose');
    var q = require('q');
    mongoose.Promise = q.Promise;

    var connectionString = process.env.mongo || "mongodb://127.0.0.1:27017/rugby";
    mongoose.createConnection(connectionString);

    var playerModel = require("./player/player.model.server")();
    var playlistModel = require("./playlist/playlist.model.server")();

    var model = {
        playerModel: playerModel,
        playlistModel: playlistModel
    };

    playerModel.setModel(model);
    playlistModel.setModel(model);

    return model;
};