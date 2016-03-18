var express = require('express');
var http = require('http');

var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);

var api = require('./routes/api');

// prepare server
app.use('/api', api); // redirect API calls
app.use('/', express.static(__dirname + '/www')); // redirect static calls
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect static calls
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); // redirect static calls
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect static calls

server.listen(36743);

io.on('connection', function (socket) {
    socket.on('join', function (data) {
        socket.join(data.seat);
        console.log('New participant: ' + data.seat);
    });

    socket.on('mouseover', function (data) {
        var connectedUser = io.sockets.in(data.seat);
        if (connectedUser != null)
            connectedUser.emit('new_color', {
                color: '#' + data.color
            });
    });
});