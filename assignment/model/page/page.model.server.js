
module.exports = function () {
    var model = {};
    var mongoose = require("mongoose");
    var PageSchema = require("./page.schema.server")();
    var PageModel  = mongoose.model("PageModel", PageSchema);
    var q = require("q");

    var api = {
        "createPage": createPage,
        "findAllPagesForWebsite": findAllPagesForWebsite,
        "findPageById": findPageById,
        "updatePage": updatePage,
        "deletePage": deletePage,
        "setModel" : setModel
    };
    return api;

    function setModel(_model) {
        model = _model;
    }

    function createPage(websiteId,page){
        var deferred = q.defer();
        PageModel.create(page,function(err,page) {
            if (err) {
                deferred.reject(err);
            } else {
                model.websiteModel.findWebsiteById(websiteId)
                    .then(function (website) {
                        website.pages.push(page);
                        website.save();
                        deferred.resolve(page);
                    }, function (err) {
                        deferred.reject(err);
                    });
            }
        });
        return deferred.promise;
    }

    function findAllPagesForWebsite(websiteId){
        var deferred = q.defer();
        PageModel.find({"_website" : websiteId},function(err,page){
            if(err){
                deferred.reject(err);
            }else{
                deferred.resolve(page);
            }
        });
        return deferred.promise;
    }

    function findPageById(pageId){
        var deferred = q.defer();
        PageModel.findById(pageId,function(err,page){
            if(err){
                deferred.reject(err);
            }else{
                deferred.resolve(page);
            }
        });
        return deferred.promise;
    }

    function updatePage(pageId,newPage){
        var deferred = q.defer();
        PageModel.update({"_id" : pageId},
            {$set : newPage}, {multi : true}, function(err,page){
                if(err){
                    deferred.reject(err);
                }else{
                    deferred.resolve(page);
                }
            });
        return deferred.promise;
    }

    function deletePage(pageId){
        var deferred = q.defer();
        PageModel.remove({"_id" : pageId},
            function(err,page){
                if(err){
                    deferred.reject(err);
                }else{
                    deferred.resolve(page);
                }
            });
        return deferred.promise;
    }
};
