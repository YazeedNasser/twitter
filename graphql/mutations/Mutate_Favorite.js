const UserController = require ( '../controllers/UserController' );
const { TweetType } = require ( '../types/Tweet_Type' );
const graphql = require ( 'graphql' );
const { 
    GraphQLNonNull,
    GraphQLID,
} = graphql

module.exports = {
    type: TweetType,
    args: { 
        UserID : { type: new GraphQLNonNull ( GraphQLID ) },
        TweetID : { type: new GraphQLNonNull ( GraphQLID ) }  
    },
    async resolve( parent, args ){
        return await UserController.FavoriteTweet ( args )
    }
}