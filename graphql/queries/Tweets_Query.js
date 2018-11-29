const { TweetType }= require('../types/Tweet_Type');
const TweetController = require('../controllers/TweetController');

module.exports = {
    type: TweetType,
    resolve(parent, args){
        return TweetController.getAll();
    }
}