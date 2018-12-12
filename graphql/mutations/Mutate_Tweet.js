const graphql= require('graphql');
const { TweetType }= require('../types/Tweet_Type');
const User = require('../models/User_Model');
const jwt = require('jsonwebtoken');
const Auth = require('../helpers/auth');
const TweetController= require('../controllers/TweetController');

const { 
    GraphQLString, 
    GraphQLNonNull, 
    GraphQLID 
} = graphql;

module.exports = {
    type: TweetType,
    args:{
        body: { type: new GraphQLNonNull ( GraphQLString ) },
        authorId: { type: new GraphQLNonNull ( GraphQLID ) }
    },
    async resolve(parent, args, req){
        // let isLoggiedIn = await User.findById({_id: args.UserID})
        // console.log(isLoggiedIn, '>>>>>>>>>>>>>>>')
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
        return await TweetController.addTweet( args );
    },

}