module.exports = function() {
    var model = {};
    var mongoose = require("mongoose");
    var PlaylistSchema = require("./playlist.schema.server")();
    var PlaylistModel  = mongoose.model("PlaylistModel", PlaylistSchema);
    var q = require("q");

    var api = {
        "createPlaylist" : createPlaylist,
        "deletePlaylist" : deletePlaylist,
        "setModel" : setModel
    };

    return api;

    function createPlaylist() {

    }

    function deletePlaylist() {

    }

    function setModel(_model) {
        model = _model;
    }
};