module.exports = function(){
    var mongoose = require("mongoose");

    var PlaylistSchema = mongoose.Schema({
            _player : {type : mongoose.Schema.Types.ObjectId, ref : 'webdev.project.players', required: true},
            name : String,
            description : String,
            //pages : [{type : mongoose.Schema.Types.ObjectId, ref : 'webdev.assignment.page'}],
            tracks : [String],
            dateCreated : {type : Date , default : Date.now()}
        },
        {collection : 'webdev.project.playlists'});

    return PlaylistSchema;
};
