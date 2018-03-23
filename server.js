const express = require('express');
const app     = express();
const server  = require('http').Server(app);

// const io = require('socket.io')(server);
// Pass ws engin to fix issue => https://github.com/socketio/socket.io/issues/3179
const io = require('socket.io')(server, { wsEngine: 'ws' });

const webpack              = require('webpack');
const webpackConfig        = require('./webpack.config');
const webpackCompiler      = webpack(webpackConfig);
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

// TODO: fix comments style
// TODO: server modules (refactoring)

// Express app

// Webpack dev server and hot module replacement middlewares
// TODO: decrease log level
app.use(webpackDevMiddleware(webpackCompiler, {
  publicPath: webpackConfig.output.publicPath,
  logLevel: 'warn'
}));
app.use(webpackHotMiddleware(webpackCompiler));

// Routes
app.get('/', (req, res) => {
  // TODO: check path on unix
  res.sendFile(__dirname + '/dist/index.html');
});


// Socket.io events

let users = new Set(['Chatbot']);

io.on('connection', (socket) => {
  // socket.broadcast.emit('user connected');
  // console.log('a user connected');

  socket.on('user login', (username) => {
    users.add(username);
    socket.emit('users list', [...users]);
    socket.broadcast.emit('user logged', username);

    socket.username = username;

    console.log(`user ${username} logged`);
  });

  socket.on('chat message', (data) => {
    console.log(`message from ${data.from} : ${data.content}`);
    socket.broadcast.emit('chat message', data);
  });

  socket.on('disconnect', () => {
    const username = socket.username;
    if (username) {
      users.delete(username);
      socket.broadcast.emit('user left', username);
      console.log(`user ${username} left`);
    }
  });
});


// Server listening
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`listening on localhost:${port}`);
});