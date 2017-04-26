module.exports = function() {
    var model = {};
    var mongoose = require("mongoose");
    var PlayerSchema = require("./player.schema.server")();
    var PlayerModel  = mongoose.model("PlayerModel", PlayerSchema);
    var q = require("q");

    var api = {
        "createPlayer": createPlayer,
        "deletePlayer": deletePlayer,
        "updatePlayer": updatePlayer,
        "findAllPlayers": findAllPlayers,
        "findPlayer" : findPlayer,
        "findPlayerByCredentials" : findPlayerByCredentials,
        "findUserByFaceBookId" : findUserByFacebookId,
        "setModel" : setModel
    };
    return api;

    function createPlayer(newPlayer) {
        var deferred = q.defer();
        PlayerModel.create(newPlayer , function(err,user){
            if(err){
                deferred.reject(err);
            }else{
                deferred.resolve(user);
            }
        });
        return deferred.promise;
    }

    function deletePlayer(pid) {
        var deferred = q.defer();
        PlayerModel.remove({"_id" : pid}, function(err,user){
                if(err){
                    deferred.reject(err);
                }else{
                    deferred.resolve(user);
                }
            });
        return deferred.promise;
    }

    function updatePlayer(pid, newPlayer) {
        var deferred = q.defer();
        PlayerModel.update({"_id" : pid},
            {$set : newPlayer}, {multi: true}, function(err, player) {
                if(err){
                    deferred.reject(err);
                }else{
                    deferred.resolve(player);
                }
            });
        return deferred.promise;
    }


    function findAllPlayers(){
        var deferred = q.defer();
        PlayerModel.find({},function(err,players){
            if(err){
                deferred.reject(err);
            }else{
                deferred.resolve(players);
            }
        });
        return deferred.promise;
    }

    function findPlayer(pid) {
        var deferred = q.defer();
        PlayerModel.findOne({'_id' : pid},function(err,player){
            if(err){
                deferred.reject(err);
            }else{
                deferred.resolve(player);
            }
        });
        return deferred.promise;
    }

    function findPlayerByCredentials(uId, uPwd) {
        var deferred = q.defer();
        PlayerModel.findOne({"username" : uId, "password" : uPwd},function(err,user){
            if(err){
                deferred.reject(err);
            }else{
                deferred.resolve(user);
            }
        });
        return deferred.promise;
    }

    function findUserByFacebookId(facebookId) {
        return PlayerModel.findOne({'facebook.id': facebookId});
    }

    function setModel(_model) {
        model = _model;
    }

};