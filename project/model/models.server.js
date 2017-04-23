module.exports = function() {
    var mongoose = require('mongoose');
    var connectionString = process.env.mongo || "mongodb://127.0.0.1:27017/rugby";
    mongoose.createConnection(connectionString);

    var playerModel = require("./player/player.model.server")();

    var model = {
        playerModel: playerModel
    };

    playerModel.setModel(model);

    return model;
};