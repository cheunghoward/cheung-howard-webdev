module.exports = function(){
    var mongoose = require("mongoose");

    var PlayerSchema = mongoose.Schema({
            name : String,
            username : {type: String, required: true, unique: true},
            password : {type: String, required: true},
            email : String,
            dateCreated : {type : Date , default : Date.now()}
        },
        {collection : 'webdev.project.players'});

    return PlayerSchema;
};