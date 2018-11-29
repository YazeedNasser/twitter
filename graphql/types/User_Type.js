const graphql = require( 'graphql' );
const {TweetFields} = require( './Tweet_Type' )
const staticFields = require( './staticFields' );
const User = require('../models/User_Model');
const Tweet = require('../models/Tweet_Model');
const { 
    GraphQLObjectType,
    GraphQLList,
    GraphQLString,
    GraphQLID
 } = graphql
 

const UserFields = new GraphQLObjectType({
    name: 'UserFields',
    fields: () =>({
        ...Data()
    })
});


const UserType = new GraphQLObjectType({
    name: 'UserType',
    fields: () => ({
        data: { type: new GraphQLList( new GraphQLObjectType({
            name: 'userData',
            fields: () => ({
                ...Data()
                })
            })) 
        },
        ...staticFields
    })
});

const Data = () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
   email: { type: GraphQLString },
   password: { type: GraphQLString },
   token: { type: GraphQLString },
   tweets: { 
       type: new GraphQLList(TweetFields),
   },
   followers: {
    type: new GraphQLList ( UserFields ), 
    async resolve(parent, args) {
        let users = [];
        for(let i = 0; i <= parent.followers.length; i++) {
            let user = parent.followers[i];
            let fetchedUser = await User.findById(user)
            if (fetchedUser) {
                console.log(fetchedUser.id, "ww")
                let tweets = await Tweet.find({ authorId: fetchedUser.id })
                console.log(tweets, "kkkkkkk")
                fetchedUser.tweets = tweets
                users.push(fetchedUser);
            }
        }
        return users;
    } 
    },
   following: { 
    type: new GraphQLList ( UserFields ),
    async resolve(parent, args) {
        let following = [];
        for(let i = 0; i <= parent.following.length; i++) {
            let followed = parent.following[i];
            let fetchUser = await User.findById(followed)
            if(fetchUser) {
                let tweets = await Tweet.find({ authorId: fetchUser.id })
                fetchUser.tweets = tweets;
                following.push(fetchUser);
            }
        }
        return following;
        } 
    },
    favorites: { 
        type: new GraphQLList(TweetFields),
    async resolve(parent, args) {
        let favs = parent.favorites
        let f = []
        for (let i = 0 ; i < favs.length; i++) {
            let tweet = await Tweet.findById(favs[i])
            f.push(tweet)
        }
        return f;
        } 
    }
});

module.exports =  { UserType, UserFields };