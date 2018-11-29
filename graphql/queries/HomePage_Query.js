const UserController = require( '../controllers/UserController' );
const { UserType } = require( '../types/User_Type' )
const graphql = require( 'graphql' );
const {  
    GraphQLID
} = graphql

module.exports = { 
    type: UserType,
    args: {
        id: { type: GraphQLID }
    },
    async resolve( parent , args ) {
        return await UserController.homePage( args );
    }
}