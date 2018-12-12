const {UserType}= require('../types/User_Type');
const UserController = require('../controllers/UserController');
const graphql = require( 'graphql' );
const { GraphQLID, GraphQLString } = graphql

module.exports = {
    type: UserType,
    args: { 
        UserID: { type: GraphQLID },
    },
    async resolve(parent, args){
        let user = await UserController.getUser( args.UserID );
        return user;
    }
}