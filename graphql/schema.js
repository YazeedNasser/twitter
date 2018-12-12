const graphql = require ( 'graphql' );
const mutation = require ( './mutations/Mutate_Index' );
const query = require ( './queries/Index_Query' );
const passport = require('passport');
const { GraphQLSchema } = graphql;

module.exports = new GraphQLSchema({
  mutation: mutation,
  query: query
})