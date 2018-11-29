const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const replySchema = new Schema ({
    body: String,
    authorId : {
        type : Schema.Types.ObjectId,
        ref: 'User'
    },
    TweetID: {
        type: Schema.Types.ObjectId,
        ref: 'Tweet'
    }
},
{ toObject: {
    virtuals: true
    },
    toJSON: {
    virtuals: true 
}});


module.exports = mongoose.model('Replies' , replySchema);