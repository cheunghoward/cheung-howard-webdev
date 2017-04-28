module.exports = function() {
    var model = {};
    var mongoose = require("mongoose");
    var PlaylistSchema = require("./playlist.schema.server")();
    var PlaylistModel  = mongoose.model("PlaylistModel", PlaylistSchema);
    var q = require("q");

    var api = {
        "createPlaylist" : createPlaylist,
        "deletePlaylist" : deletePlaylist,
        "findPlaylistById": findPlaylistById,
        "findPlaylistsForPlayer" : findPlaylistsForPlayer,
        "addTrackToPlaylist" : addTrackToPlaylist,
        "setModel" : setModel
    };

    return api;

    function addTrackToPlaylist(trackId, playlistId) {
        return PlaylistModel.update({_id: playlistId}, {$push: {tracks: trackId}});
    }

    function createPlaylist(playerId, playlist) {
        var deferred = q.defer();
        PlaylistModel.create(playlist, function(err, playlist) {
            if (err) {
                deferred.reject(err);
            } else {
                model.playerModel.findPlayer(playerId)
                    .then(function (player) {
                        player.playlists.push(playlist);
                        player.save();
                        deferred.resolve(player);
                    }, function (err) {
                        deferred.reject(err);
                    });
            }
        });
        return deferred.promise;
    }

    function deletePlaylist(playlistId) {
        var deferred = q.defer();
        PlaylistModel.remove({"_id" : playlistId},
            function(err,playlist){
                if(err){
                    deferred.reject(err);
                }else{
                    deferred.resolve(playlist);
                }
            });
        return deferred.promise;
    }

    function findPlaylistById(playlistId) {
        return PlaylistModel.findOne({_id: playlistId});
    }

    function findPlaylistsForPlayer(playerId) {
        var deferred = q.defer();
        PlaylistModel.find({"_player" : playerId}, function(err, playlists){
            if(err){
                deferred.reject(err);
            }else{
                deferred.resolve(playlists);
            }
        });
        return deferred.promise;
    }

    function setModel(_model) {
        model = _model;
    }
};