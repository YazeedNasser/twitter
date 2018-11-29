const Users = require( './Users_Query' );
const Tweets = require( './Tweets_Query' );
const Tweet = require( './Tweet_Query' );
const User = require( './User_Query' );
const HomePage = require ( './HomePage_Query' );
const Search = require ( './Search_Query' );
const graphql = require( 'graphql' );
const { 
    GraphQLObjectType
 } = graphql

const RootQuery= new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        Users: {
            ...Users
        },
        Tweets: {
            ...Tweets
        },
        Tweet: {
            ...Tweet
        }, 
        User: {
            ...User
        },
        HomePage: {
            ...HomePage
        },
        Search: {
            ...Search
        }
    }
})

module.exports = RootQuery; 