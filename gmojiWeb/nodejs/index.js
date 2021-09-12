const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.static('../src'));

app.get('/', function(req, res){
  res.sendfile('../src/index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('eval', function(msg){
      io.emit('evalClient', msg);
  });

  socket.on('statsClient', function(msg){
      io.emit('stats', msg);
  })
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
