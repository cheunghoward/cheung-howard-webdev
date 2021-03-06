module.exports = function(app) {
    var mongoose = require('mongoose');
    var q = require('q');
    mongoose.Promise = q.Promise;

    var connectionString = process.env.mongo || "mongodb://127.0.0.1:27017/test" ;
    mongoose.createConnection(connectionString);

    var userModel = require("./user/user.model.server")();
    var websiteModel = require("./website/website.model.server")();
    var pageModel = require("./page/page.model.server")();
    var widgetModel = require("./widget/widget.model.server")();

    var model = {
        userModel : userModel,
        websiteModel : websiteModel,
        pageModel : pageModel,
        widgetModel : widgetModel
    };

    userModel.setModel(model);
    websiteModel.setModel(model);
    pageModel.setModel(model);
    widgetModel.setModel(model);

    return model;
};
