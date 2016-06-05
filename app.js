var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var moment = require('moment');

moment().format();

app.get('/', function(req, res){
  res.sendfile('index.html');
});

app.get('/css/main.css', function(req, res){
  res.sendfile('src/css/main.css');
});

app.get('/js/main.js', function(req, res){
  res.sendfile('src/js/main.js');
})

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
   socket.on('chat message', function(msg){
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});