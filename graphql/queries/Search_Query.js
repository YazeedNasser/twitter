const TweetController = require ( '../controllers/TweetController' );
const { TweetType } = require ( '../types/Tweet_Type' );
const graphql = require ( 'graphql' );
const { 
    GraphQLNonNull,
    GraphQLString
} = graphql

module.exports = {
    type: TweetType,
    args: { 
        body: { type: new GraphQLNonNull( GraphQLString ) }  
    },
    async resolve( parent, args ){
        return await TweetController.searchTweet ( args )
    }
}