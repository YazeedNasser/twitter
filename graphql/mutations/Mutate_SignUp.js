const {UserType} = require( '../types/User_Type' );
const UserController = require( '../controllers/UserController' );
const graphql = require( 'graphql' );
const { 
    GraphQLString,
    GraphQLNonNull
} = graphql;

module.exports = {
    type: UserType,
    name: 'REGISTER',
    args: {
        name: { type: new GraphQLNonNull ( GraphQLString ) },
        email: { type: new GraphQLNonNull ( GraphQLString ) },
        password: { type: new GraphQLNonNull ( GraphQLString ) }
    },
    async resolve( parent , args ) {
        console.log('kkkkkkkkkkkkkkkkkkkkkk')
        return await UserController.signUp( args ); 
    }
}