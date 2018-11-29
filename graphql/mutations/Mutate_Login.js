const UserController = require( '../controllers/UserController' );
const {UserType} = require( '../types/User_Type' );
const graphql = require( 'graphql' );
const { 
    GraphQLNonNull,
    GraphQLString
 } = graphql

module.exports = {
    type: UserType,
    args: {
        email: { type: new GraphQLNonNull( GraphQLString ) },
        password: { type: new GraphQLNonNull( GraphQLString ) }
    },
    async resolve ( parent , args ) {
        return await UserController.login( args );
    }
}