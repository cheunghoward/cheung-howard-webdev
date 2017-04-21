module.exports = function(){
    var mongoose = require("mongoose");

    var PlayerSchema = mongoose.Schema({
            name : String
        },
        {collection : 'rugby.players'});

    return PlayerSchema;
};