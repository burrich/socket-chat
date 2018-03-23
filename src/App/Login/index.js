import React, { Component } from 'react';
import { hot } from 'react-hot-loader';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = { usernameInput: '' };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ usernameInput: e.target.value });
  }

  handleSubmit(e) {
    const ENTER_KEY = 13; // TODO: move to util.js file
    if (e.keyCode === ENTER_KEY) {
      e.preventDefault();

      const username = this.state.usernameInput.trim();
      if (username !== '') {
        this.props.onLoginSubmit(username);
      }
    }
  }

  render() {
    return (
      <div className="login">
        <div className="login-box">
          <form className="login-form">
            <label htmlFor="nickname">Your nickname : </label>

            <input 
              autoFocus 
              placeholder="Press Enter to submit"
              value={this.state.usernameInput}
              onChange={this.handleChange} 
              onKeyDown={this.handleSubmit} />
          </form>
        </div>
      </div>
    );
  }
}

export default hot(module)(Login);