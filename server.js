const express = require('express');
const app     = express();
const server  = require('http').Server(app);

// const io   = require('socket.io')(server);
// Pass ws engin to fix issue => https://github.com/socketio/socket.io/issues/3179
const io      = require('socket.io')(server, { wsEngine: 'ws' });


// Server listening
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`listening on localhost:${port}`);
});


// Express app

/*
 * Serve static files
 * By default '/' is mapped to index.html
 */
app.use(express.static('public')); 


// Socket.io events

let users = new Set([]);

io.on('connection', (socket) => {
  // socket.broadcast.emit('user connected');
  // console.log('a user connected');

  socket.on('user logging', (username) => {
    users.add(username);
    socket.emit('users list', [...users]);

    socket.username = username;
    socket.broadcast.emit('user logged', username);

    console.log(`user ${username} logged`);
  });

  socket.on('chat message', (data) => {
    console.log(`message from ${data.from} : ${data.msg}`);
    socket.broadcast.emit('chat message', data);
  });

  socket.on('disconnect', () => {
    const username = socket.username;
    if (username) {
      users.delete(username);
      socket.broadcast.emit('user disconnected', username);
      console.log(`user ${username} disconnected`);
    }
  });
});