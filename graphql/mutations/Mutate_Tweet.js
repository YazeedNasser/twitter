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
    name:"AddTweet",
    args:{
        body: { type: new GraphQLNonNull ( GraphQLString ) },
    },
    async resolve(parent, args, req){
        console.log('START OF FUNCTION')
        // let isLoggiedIn = await User.findById({_id: args.UserID})
        // console.log(isLoggiedIn, '>>>>>>>>>>>>>>>')
        let token = req && req.headers && req.headers.authorization

        console.log(token, "RECEIVED TOKEN")
        if (!token) {
            let res = {
                statusCode: 500,
                message: 'You don\'t have permissions'
            }
            return res
        }
        let payload = await jwt.decode(token)

        console.log(payload, "THE PAYLOAD")

        if (!payload) {
            let res = {
                statusCode: 500,
                message: 'This user is not found'
            }
            return res
        }
        let user = await User.findById(payload.id)

        console.log(user, "USER IN DB")
        if (!user) {
            let res = {
                statusCode: 500,
                message: 'This user is not found'
            }
            return res
        }

        args.authorId = user.id

        console.log(args, "CREATING IN API")
        return await TweetController.addTweet( args );
    },

}