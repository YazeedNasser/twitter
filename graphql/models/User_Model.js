const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema ({
    name: String,
    email: String,
    password: String,
    followers: {
        type: [Schema.Types.ObjectId],
        ref: 'User',
    },
    following: { 
        type: [Schema.Types.ObjectId],
        ref: 'User',
    },
    favorites: {
        type: [Schema.Types.ObjectId],
        ref: 'Tweet',
    }
},

{ toObject: {
        virtuals: true
    },
    toJSON: {
        virtuals: true 
}});

userSchema.virtual( 'tweets', {
    localField: '_id',
    foreignField: 'authorId',
    ref: 'Tweet'
});
module.exports = mongoose.model('User' , userSchema);