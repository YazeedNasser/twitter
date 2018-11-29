const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require( './graphql/schema' );
const Router = require( './graphql/routers/router' );
const app = express();

app.use('/graphql' , graphqlHTTP({
    schema,
    graphiql: true
}))

app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://127.0.0.1:27017/twitter');

mongoose.connection.once('open', function(){
    console.log( 'CONECTED!' );
});

app.use('/', Router);

app.listen( 3000 , function() {
    console.log( 'IT WORKS!!' )
} )