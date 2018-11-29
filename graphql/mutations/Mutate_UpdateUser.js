const {UserType} = require( '../types/User_Type' );
const UserController = require( '../controllers/UserController' );
const graphql = require( 'graphql' );
const { 
    GraphQLString,
    GraphQLNonNull,
    GraphQLID
} = graphql;

module.exports = {
    type: UserType,
    args: {
        UserID: { type: new GraphQLNonNull ( GraphQLID ) },
        name: { type: new GraphQLNonNull ( GraphQLString ) },
        email: { type: new GraphQLNonNull ( GraphQLString ) },
    },
    async resolve( parent , args ) {
        return await UserController.updateUser( args ); 
    }
}