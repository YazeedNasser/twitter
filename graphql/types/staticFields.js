const graphql = require( 'graphql' );
const {
    GraphQLInt, 
    GraphQLString, 
    GraphQLList, 
    GraphQLObjectType 
} = graphql

module.exports = {
    statusCode : { type: GraphQLInt },
    message: { type: GraphQLString },
    errors: { type: new GraphQLList( new GraphQLObjectType({
        name: 'errors',
        fields: () => ({
            error: { type: GraphQLString },
            path: { type: GraphQLString }
        })
    }))  }
}