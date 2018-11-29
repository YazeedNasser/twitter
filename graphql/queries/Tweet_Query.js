const { TweetType }= require('../types/Tweet_Type');
const TweetController = require('../controllers/TweetController');
const graphql = require( 'graphql' );
const { GraphQLID } = graphql

module.exports = {
    type: TweetType,
    args: {
        UserID: { type: GraphQLID }, 
        TweetID: { type: GraphQLID }
    },
    async resolve(parent, args){
        let tweet = await TweetController.getTweet( args.TweetID );
        console.log(tweet.data)
        return tweet;
    }
}