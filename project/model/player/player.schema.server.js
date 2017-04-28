module.exports = function(){
    var mongoose = require("mongoose");

    var PlayerSchema = mongoose.Schema({
            name : String,
            username : {type: String, unique: true},
            password : {type: String},
            email : String,
            favoriteArtists: String,
            profile: String,
            role : {type: String, enum: ['admin', 'user'], default: 'user'},
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