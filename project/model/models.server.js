module.exports = function() {
    var mongoose = require('mongoose');
    mongoose.createConnection("mongodb://127.0.0.1:27017/rugby");

    var playerModel = require("./player/player.model.server")();

    var model = {
        playerModel: playerModel
    };

    playerModel.setModel(model);

    return model;
};