const staticFileds = require('./staticFields');
const graphql= require('graphql');

const {
    GraphQLString, 
    GraphQLID, 
    GraphQLList, 
    GraphQLObjectType
} = graphql;

const Data= {
    id: { type: GraphQLID },
    body:{ type: GraphQLString },
}

const TweetFields = new GraphQLObjectType({
    name: "TweetFields",
    fields: () =>{
        const {UserType}  = require('./User_Type')
        return {
            authorId: { type: UserType },
            ...Data       
        }
    }
});

const TweetType = new GraphQLObjectType({
    name: 'TweetType',
    fields: () => {
        const {UserFields}  = require('./User_Type')
        return {
            data: { type: new GraphQLList(new GraphQLObjectType({
                name: 'data',
                fields: () =>({
                    authorId: { type: UserFields },
                    ...Data
                    })
                })) 
            },
            ...staticFileds
        }
    }
});

module.exports = { TweetType, TweetFields };