module.exports = function() {
    var model = {};
    var mongoose = require("mongoose");
    var WebsiteSchema = require("./website.schema.server")();
    var WebsiteModel  = mongoose.model("WebsiteModel", WebsiteSchema);
    var q = require("q");

    var api = {
        "createWebsiteForUser": createWebsiteForUser,
        "findAllWebsitesForUser": findAllWebsitesForUser,
        "findWebsiteById": findWebsiteById,
        "updateWebsite": updateWebsite,
        "deleteWebsite": deleteWebsite,
        "setModel" : setModel
    };
    return api;

    function setModel(_model) {
        model = _model;
    }

    function createWebsiteForUser(userId,website){
        var deferred = q.defer();
        WebsiteModel.create(website,function(err,website) {
            if (err) {
                deferred.reject(err);
            } else {
                model.userModel.findUserById(userId)
                    .then(function (user) {
                        user.websites.push(website);
                        user.save();
                        deferred.resolve(website);
                    }, function (err) {
                        deferred.reject(err);
                    });
            }
        });
        return deferred.promise;
    }

    function findAllWebsitesForUser(userId){
        var deferred = q.defer();
        WebsiteModel.find({"_user" : userId},function(err,website){
            if(err){
                deferred.reject(err);
            }else{
                deferred.resolve(website);
            }
        });
        return deferred.promise;
    }

    function findWebsiteById(websiteId){
        var deferred = q.defer();
        WebsiteModel.findById(websiteId, function(err,website){
            if(err){
                deferred.reject(err);
            }else{
                deferred.resolve(website);
            }
        });
        return deferred.promise;
    }

    function updateWebsite(websiteId,newWebsite){
        var deferred = q.defer();
        WebsiteModel.update({"_id" : websiteId},
            {$set : newWebsite}, {multi : true}, function(err,website){
                if(err){
                    deferred.reject(err);
                }else{
                    deferred.resolve(website);
                }
            });
        return deferred.promise;
    }

    function deleteWebsite(websiteId){
        var deferred = q.defer();
        WebsiteModel.remove({"_id" : websiteId},
            function(err,website){
                if(err){
                    deferred.reject(err);
                }else{
                    deferred.resolve(website);
                }
            });
        return deferred.promise;
    }
};