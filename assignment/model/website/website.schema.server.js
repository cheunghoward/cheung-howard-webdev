module.exports = function(){
    var mongoose = require("mongoose");

    var WebsiteSchema = mongoose.Schema({
            _user : {type : mongoose.Schema.Types.ObjectId, ref : 'webdev.assignment.user'},
            name : String,
            description : String,
            pages : [{type : mongoose.Schema.Types.ObjectId, ref : 'webdev.assignment.page'}],
            dateCreated : {type : Date , default : Date.now()}
        },
        {collection : 'webdev.assignment.website'});

    return WebsiteSchema;
};