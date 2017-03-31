module.exports = function(){
    var mongoose = require("mongoose");

    var PageSchema = mongoose.Schema({
            _website : {type : mongoose.Schema.Types.ObjectId, ref : 'webdev.assignment.website'},
            name : String,
            title : String,
            description : String,
            widgets : [{type : mongoose.Schema.Types.ObjectId, ref : 'webdev.assignment.widget'}],
            dateCreated : {type : Date , default : Date.now()}
        },
        {collection : 'webdev.assignment.page'});

    return PageSchema;
};