const graphql= require('graphql');
const { TweetType }= require('../types/Tweet_Type');
const TweetController= require('../controllers/TweetController');

const { 
    GraphQLNonNull, 
    GraphQLID 
} = graphql;

module.exports= {
    type: TweetType,
    args: {
        TweetID: { type: new GraphQLNonNull ( GraphQLID ) }
    },
    async resolve(parent, args){
            return await TweetController.DeleteTweet( args );
    }   
}