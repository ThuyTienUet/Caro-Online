let path = require('path');
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static(path.join(__dirname, '../client')));
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../client/index.html'))
});

server.listen(3000);

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});