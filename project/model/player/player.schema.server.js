module.exports = function(){
    var mongoose = require("mongoose");

    var PlayerSchema = mongoose.Schema({
            name : String,
            username : {type: String},
            password : {type: String},
            email : String,
            role : {type: String, enum: ['admin', 'user'], default: 'user'},
            favoriteArtists: String,
            facebook: {
                id:    String,
                token: String
            },
            playlists : [{type : mongoose.Schema.Types.ObjectId, ref : 'webdev.project.playlists'}],
            dateCreated : {type : Date , default : Date.now()}
        },
        {collection : 'webdev.project.players'});

    return PlayerSchema;
};