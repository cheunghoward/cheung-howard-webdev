module.exports = function () {
    var model = {};
    var mongoose = require("mongoose");
    var WidgetSchema = require("./widget.schema.server")();
    var WidgetModel  = mongoose.model("WidgetModel", WidgetSchema);
    var q = require("q");

    var api = {
        "createWidget": createWidget,
        "findAllWidgetsForPage": findAllWidgetsForPage,
        "findWidgetById": findWidgetById,
        "updateWidget": updateWidget,
        "deleteWidget": deleteWidget,
        "setModel" : setModel
    };
    return api;

    function setModel(_model) {
        model = _model;
    }

    function createWidget(pageId,widget){
        var deferred = q.defer();
        WidgetModel.create(widget,function(err,widget) {
            if (err) {
                deferred.reject(err);
            } else {
                model.pageModel.findPageById(pageId)
                    .then(function (page) {
                        page.widgets.push(widget);
                        page.save();
                        deferred.resolve(widget);
                    }, function (err) {
                        deferred.reject(err);
                    });
            }
        });
        return deferred.promise;
    }

    function findAllWidgetsForPage(pageId){
        var deferred = q.defer();
        WidgetModel.find({"_page" : pageId},function(err,widgets){
            if(err){
                deferred.reject(err);
            }else{
                deferred.resolve(widgets);
            }
        });
        return deferred.promise;
    }

    function findWidgetById(widgetId){
        var deferred = q.defer();
        WidgetModel.findById(widgetId,function(err,widget){
            if(err){
                deferred.reject(err);
            }else{
                deferred.resolve(widget);
            }
        });
        return deferred.promise;
    }

    function updateWidget(widgetId,newWidget){
        var deferred = q.defer();
        WidgetModel.update({"_id" : widgetId},
            {$set : newWidget}, {multi : true}, function(err,widget){
                if(err){
                    deferred.reject(err);
                }else{
                    deferred.resolve(widget);
                }
            });
        return deferred.promise;
    }

    function deleteWidget(widgetId){
        var deferred = q.defer();
        WidgetModel.remove({"_id" : widgetId},
            function(err,widget){
                if(err){
                    deferred.reject(err);
                }else{
                    deferred.resolve(widget);
                }
            });

        return deferred.promise;
    }

};