const {UserType} = require( '../types/User_Type' );
const UserController = require( '../controllers/UserController' );
const jwt = require('jsonwebtoken')
const User = require('../models/User_Model')
const Auth =require('../helpers/auth');
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
    async resolve( parent , args, req ) {
        // let user = await User.findById({_id: args.UserID})
        // user.Auth()
        // console.log(user, '>>>>>>>>>>>')
        let token = req && req.headers && req.headers.authorization
        if (!token) {
            let res = {
                statusCode: 500,
                message: 'You don\'t have permissions'
            }
            return res
        }
        let payload = await jwt.decode(token)
        if (!payload) {
            let res = {
                statusCode: 500,
                message: 'This user is not found'
            }
            return res
        }
        let user = await User.findById(payload.id)
        if (!user) {
            let res = {
                statusCode: 500,
                message: 'This user is not found'
            }
            return res
        }
        return await UserController.updateUser( args ); 
    }
}