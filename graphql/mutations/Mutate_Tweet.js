const graphql= require('graphql');
const { TweetType }= require('../types/Tweet_Type');
const TweetController= require('../controllers/TweetController');

const { 
    GraphQLString, 
    GraphQLNonNull, 
    GraphQLID 
} = graphql;

module.exports = {
    type: TweetType,
    args:{
        body: { type: new GraphQLNonNull ( GraphQLString ) },
        authorId: { type: new GraphQLNonNull ( GraphQLID ) }
    },
    async resolve(parent, args){
        return await TweetController.addTweet( args );
    },

}