module.exports = function(app) {
    var model = {};
    var mongoose = require("mongoose");
    var UserSchema = require("./user.schema.server")();
    var UserModel  = mongoose.model("UserModel", UserSchema);
    var q = require("q");

    var api = {
        "createUser": createUser,
        "findUserById": findUserById,
        "findUserByUsername": findUserByUsername,
        "findUserByCredentials": findUserByCredentials,
        "updateUser": updateUser,
        "deleteUser": deleteUser,
        "setModel" : setModel
    };
    return api;

    function setModel(_model) {
        model = _model;
    }

    function createUser(newUser){
        var deferred = q.defer();
        UserModel.create(newUser,function(err,user){
            if(err){
                deferred.reject(err);
            }else{
                deferred.resolve(user);
            }
        });
        return deferred.promise;
    }

    function findUserById(uId){
        var deferred = q.defer();
        UserModel.findById(uId,function(err,user){
            if(err){
                deferred.reject(err);
            }else{
                deferred.resolve(user);
            }
        });
        return deferred.promise;
    }

    function findUserByUsername(uName){
        var deferred = q.defer();
        UserModel.findOne({"username" : uName},function(err,user){
            if(err){
                deferred.reject(err);
            }else{
                deferred.resolve(user);
            }
        });
        return deferred.promise;
    }

    function findUserByCredentials(uId,uPwd){
        var deferred = q.defer();
        UserModel.findOne({"username" : uId, "password" : uPwd},function(err,user){
            if(err){
                deferred.reject(err);
            }else{
                deferred.resolve(user);
            }
        });
        return deferred.promise;
    }

    function updateUser(uId,newUser){
        var deferred = q.defer();
        UserModel.update({"_id" : uId},
            {$set : newUser}, {multi : true}, function(err,user){
                if(err){
                    deferred.reject(err);
                }else{
                    deferred.resolve(user);
                }
            });
        return deferred.promise;
    }

    function deleteUser(uId) {
        var deferred = q.defer();
        UserModel.remove({"_id" : uId},
            newUser, function(err,user){
                if(err){
                    deferred.reject(err);
                }else{
                    deferred.resolve(user);
                }
            });
        return deferred.promise;
    }
};