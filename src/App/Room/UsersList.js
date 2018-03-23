import React from 'react';
import { hot } from 'react-hot-loader';

function UsersList(props) {
  const usersListItems = props.users.map((user, index) => 
    <li key={index}>
      {user}
    </li>
  );

  return (
    <div id="users">
      <h2>Users list</h2>
      <ul>{usersListItems}</ul>
    </div>
  );
}

export default hot(module)(UsersList);