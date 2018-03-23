import React, { Component } from 'react';
import { hot } from 'react-hot-loader';

import MessagesList from './MessagesList';
import UsersList from './UsersList';

class Room extends Component {
  constructor(props) {
    super(props);

    this.state = { messageInput: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ messageInput: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();

    this.props.onRoomSubmit({ 
      from: this.props.username,
      content: this.state.messageInput 
    });

    this.setState({ messageInput: '' });
  }

  render() {
    // TODO: form component ?
    const messageForm = (
      <form 
        className="room-form"
        onSubmit={this.handleSubmit}>

        <input 
          id="msg"
          autoComplete="off"
          autoFocus
          value={this.state.messageInput}
          onChange={this.handleChange} />

        <button>Send</button>
      </form>
    );

    return (
      <div className="room">
        <MessagesList messages={this.props.messages} />

        {messageForm}
        
        <UsersList users={this.props.users} />
      </div> 
    );
  }
}

export default Room;