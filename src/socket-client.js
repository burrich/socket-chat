import io from 'socket.io-client';

// Init Socket.io client 
const socket = io();
console.log('socket.io client init');

/**
 * Emitters
 */

function emitChatMessage(data) {
  socket.emit('chat message', data);
}

function emitUserLogin(username) {
  socket.emit('user login', username);
}

/**
 * Listeners
 */

function onChatMessage(cb) {
  socket.on('chat message', (data) => {
    cb(null, data);
  });
}

function onUserLeft(cb) {
  socket.on('user left', (username) => {
    cb(null, username);
  });
}

function onUserLogged(cb) {
  socket.on('user logged', (username) => {
    cb(null, username);
  });
}

function onUsersList(cb) {
  socket.on('users list', (users) => {
    cb(null, users);
  });
}

export { 
  emitChatMessage, 
  emitUserLogin, 
  onChatMessage, 
  onUserLeft, 
  onUserLogged, 
  onUsersList
};