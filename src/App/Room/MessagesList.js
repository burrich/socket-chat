import React from 'react';
import { hot } from 'react-hot-loader';

function MessagesList(props) {
  const messagesListItems = props.messages.map((message, index) =>
    <li key={index}>
      <span className="message-from">{message.from}</span>
      <span className="message-content"> : {message.content}</span>
    </li>
  );

  return (
    <ul id="messages">{messagesListItems}</ul>
  );
}

export default hot(module)(MessagesList);