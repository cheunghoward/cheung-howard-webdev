module.exports = function(app) {
    var model = require("./model/models.server")();
    require("./services/player.service.server")(app, model);
};