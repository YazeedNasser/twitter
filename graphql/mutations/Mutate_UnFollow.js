const UserController = require( '../controllers/UserController' );
const {UserType} = require( '../types/User_Type' );
const graphql = require( 'graphql' );
const { 
    GraphQLID,
    GraphQLNonNull
} = graphql

module.exports = {
    type: UserType,
    args: { 
        follower: { type:  new GraphQLNonNull (GraphQLID) },
        followed: { type:  new GraphQLNonNull (GraphQLID) }
    },
    async resolve( parent, args ) {
        return await UserController.unFollowUser( args )
    }
}