const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tweetSchema = new Schema ({
    body: String,
    authorId : {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    users: {
        type: [Schema.Types.ObjectId],
        ref: 'User'
    }
},


{ toObject: {
    virtuals: true
},
toJSON: {
    virtuals: true 
}});

tweetSchema.index({
    body: 'text'
})
module.exports = mongoose.model('Tweet' , tweetSchema);