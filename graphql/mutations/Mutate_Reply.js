const TweetController = require( '../controllers/TweetController' );
const { TweetType, TweetFields } = require( '../types/Tweet_Type' );
const graphql = require( 'graphql' );
const { 
    GraphQLNonNull,
    GraphQLID,
    GraphQLString
} = graphql 

module.exports = {  
    type: TweetType,
    args: {
        TweetID: { type: new GraphQLNonNull ( GraphQLID ) },
        authorId: { type: new GraphQLNonNull ( GraphQLID )  },
        body: { type: new GraphQLNonNull ( GraphQLString ) }
    },
    async resolve( parent, args ) {
        return await TweetController.ReplyTweet( args )
    }
}