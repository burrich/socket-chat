// Socket.io init
const socket = io();
console.log('socket.io client init');

let logged = false;
let username;

// Set Login form
const loginForm = document.querySelector('.login-form');
loginForm.onsubmit = submitLoginForm;

/*
  * Function submitLoginForm emit user logging and display the chat room.
  */
function submitLoginForm(e) {
  e.preventDefault();

  // TODO: validation
  username = document.querySelector('#nickname').value;
  socket.emit('user logging', username);
  logged = true;

  const loginElt = document.querySelector('.login');
  loginElt.style.display = 'none';
}

// Set room form
const roomForm = document.querySelector('.room-form');
roomForm.onsubmit = submitRoomForm;

/*
  * Function submitRoomForm process data on message submission.
  * Display the message and emit it for server broadcast.
  */
function submitRoomForm(e) {
  e.preventDefault();

  const msg = document.querySelector('#msg');
  const msgData = {
    msg: msg.value,
    from: username
  };

  displayMsg(msgData);
  msg.value = '';
  socket.emit('chat message', msgData);
}

/*
  * Function displayMsg create and append message element.
  */
function displayMsg(data) {
  const spanFrom = document.createElement('span');
  spanFrom.classList.add('message-from');
  spanFrom.textContent = data.from + ' : ';

  const spanContent = document.createElement('span');
  spanContent.classList.add('message-content');
  spanContent.textContent = data.msg;

  const li = document.createElement('li');
  li.appendChild(spanFrom);
  li.appendChild(spanContent);

  const messages = document.querySelector('#messages');
  messages.appendChild(li);
}

/*
  * Function displayUser add a new logged user to users list.
  */
function displayUser(user) {
  const usersElt = document.querySelector('#users ul');
  const li = document.createElement('li');
  li.textContent = user;

  usersElt.appendChild(li);
  console.log(usersElt.childNodes.length + ' users logged');
}

function displayUsers(users) {
  const usersElt = document.querySelector('#users ul');
  
  for (let i = 0; i < users.length; i++) { // es6+ ?
    const li = document.createElement('li');
    li.textContent = users[i];

    usersElt.appendChild(li);
  }

  console.log(users.length + ' users logged');
}

function removeUser(user) {
  const usersElts = document.querySelectorAll('#users li');
  let userToRemoveElt;
  
  for (let i = 0; i < usersElts.length; i++) {
    if (usersElts[i].textContent === user) {
      userToRemoveElt = usersElts[i]; 
      break;
    }
  }

  usersElts[0].parentElement.removeChild(userToRemoveElt);
  console.log(usersElts.length - 1 + ' users logged');
}


// Socket.io events

// TODO: replace if by express middleware ?
socket.on('user logged', (anotherUser) => {
  if (logged) {
    console.log(`user ${anotherUser} logged`);
    displayUser(anotherUser);
  }
});

socket.on('users list', (users) => {
  displayUsers(users);
});

socket.on('chat message', (data) => {
  if (logged) {
    displayMsg(data);
  }
});

socket.on('user disconnected', (anotherUser) => {
  if (logged) {
    console.log(`user ${anotherUser} disconnected`);
    removeUser(anotherUser);
  }
});
