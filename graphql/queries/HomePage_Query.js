const UserController = require( '../controllers/UserController' );
const { UserType } = require( '../types/User_Type' )
const graphql = require( 'graphql' );
const {  
    GraphQLID,
    GraphQLString
} = graphql

module.exports = { 
    type: UserType,
    name:'HomePage',
    args: {
        id: { type: GraphQLID },
        token: { type: GraphQLString }
    },
    async resolve( parent , args ) {
        return await UserController.homePage( args );
    }
}