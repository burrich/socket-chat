import React, { Component } from 'react';
import { hot } from 'react-hot-loader';

import Login from './Login';
import Room from './Room';

import * as socket from '../socket-client'

import './style.css'; // TODO: components styles

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      user: {
        logged: false,
        username: null,
      },
      users: [],
      messages: [{ 
        from: 'Chatbot', 
        content: 'Welcome to Socket chat !' 
      }]
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleRoom  = this.handleRoom.bind(this);
  }

  /**
   * Sub-components handlers
   * TODO: better methods names
   */

  handleLogin(username) {
    this.suscribeToServerEvents();

    // Allow server to emit users list
    socket.emitUserLogin(username);

    this.setState({
      user: {
        logged: true,
        username: username,
      }
    });
  }

  handleRoom(data) {
    this.addMessage(data);
    socket.emitChatMessage(data);
  }

  /**
   * State CRUD
   */

  addMessage(data) {
    const messagesUpdated = this.state.messages.slice();
    messagesUpdated.push({ 
      from: data.from,
      content: data.content
    });

    this.setState({ messages: messagesUpdated});
  }

  addUser(username) {
    const usersUpdated = this.state.users.slice();
    usersUpdated.push(username);

    this.setState({  users: usersUpdated });
  }

  removeUser(username) {
    const usersUpdated  = this.state.users.slice();
    const usernameIndex = usersUpdated.indexOf(username);
    usersUpdated.splice(usernameIndex, 1);

    this.setState({ users: usersUpdated });
  }

  /**
   * Server events subscription (socket.io)
   */
  suscribeToServerEvents() {
    socket.onUsersList((err, users) => {
      if (err) return console.error(err);

      this.setState({ users: users });
    });

    socket.onUserLogged((err, username) => {
      if (err) return console.error(err);

      this.addUser(username);
    });

    socket.onUserLeft((err, username) => {
      if (err) return console.error(err);

      this.removeUser(username);
    })

    socket.onChatMessage((err, data) => {
      if (err) return console.error(err);

      this.addMessage(data);
    })
  }
  
  render() {    
    const user = this.state.user;
    
    if (!user.logged) {
      return <Login onLoginSubmit={this.handleLogin} />;
    }

    return (
      <Room 
        username={user.username}
        users={this.state.users}
        messages={this.state.messages}
        onRoomSubmit={this.handleRoom} />
    );
  }
}

// Export App with hot reload
export default hot(module)(App);