// Make connection

var socket = io.connect('http://localhost:3000')

//Query DOM

var handle = document.getElementById('handle'),
    mesaage = document.getElementById('message'),
    ouput = document.getElementById('ouput'),
    feedback = document.getElementById('feedback')
    btn = document.getElementById('button')

//Emit Event

btn.addEventListener('click', function(data){
    socket.emit('chat', {
        handle: handle.value,
        message: message.value
    })
})

message.addEventListener('keypress', function(data){
    socket.emit('typing', data)
})

//Event Listener

socket.on('chat', function(data){
    feedback.innerHTML = "";
    ouput.innerHTML += '<p><strong>' + data.handle + ': ' + '</strong>' + data.message + '</p>'
})

socket.on('typing', function(data){
    feedback.innerHTML + '<p><em>' + data + ' is typing.....' + '</em></p>'
})