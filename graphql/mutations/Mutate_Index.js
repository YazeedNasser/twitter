const AddUser = require( './Mutate_SignUp' );
const login = require( './Mutate_Login' );
const AddTweet = require( './Mutate_Tweet' );
const Update = require( './Mutate_UpdateUser' );
const changePassword = require( './Mutate_ChangePassowrd' );
const deleteTweet = require( './Mutate_DeleteTweet' );
const reply = require( './Mutate_Reply' );
const Favorite = require( './Mutate_Favorite' );
const unFavorite = require( './Mutate_UnFavorite' );
const Follow = require( './Mutate_Follow' );
const UnFollow = require ( './Mutate_UnFollow' );
const graphql = require( 'graphql' );
const { 
    GraphQLObjectType
 } = graphql

 const mutations = new GraphQLObjectType ({
     name: 'Mutations',
     fields: {
        signUP: {
            ...AddUser
        },
        login: {
            ...login
        },
        AddTweet: {
            ...AddTweet
        },
        UpdateUser: {
            ...Update
        },
        changePassword: {
            ...changePassword
        },
        Delete: {
            ...deleteTweet
        },
        ReplyTweet: {
            ...reply
        },
        Follow: {
            ...Follow
        },
        UnFollow: {
            ...UnFollow
        },
        Favorite : {
            ...Favorite
        },
        unFavorite: {
            ...unFavorite
        },
       
    }
})

module.exports = mutations; 