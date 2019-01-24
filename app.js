const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const express = require('express');
const graphqlHTTP = require('express-graphql');
// const playground = require('graphql-playground')
const schema = require( './graphql/schema' );
const Router = require( './graphql/routers/router' );
const socket = require('socket.io');
const app = express();
const cors = require('cors')

app.use(cors({}))


app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://127.0.0.1:27017/twitter');

mongoose.connection.once('open', function(){
    console.log( 'CONECTED!' );
});

app.use('/', Router);

app.use('/graphql' , graphqlHTTP({
    schema,
    graphiql: true
}))

var server = app.listen( 4000 , function() {
    console.log( 'IT WORKS!!' )
} )

io = socket(server);

io.on('connection', function(){
    console.log('user connected', socket.id)

    socket.on('chat', function(data){
        io.sockets.emit('chat', data)
    })

    socket.on('typing', function(data){
        socket.broadcast.emit('typing', data)
    })
})

