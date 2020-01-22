import React, { Component } from "react";
import PropTypes from "prop-types";

class AuthForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      username: "",
      password: ""
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    const authType = this.props.signUp ? "signup" : "signin";
    this.props
      .onAuth(authType, this.state)
      .then(() => {
        this.props.history.push("/");
      })
      .catch(() => {
        return;
      });
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { email, username, password } = this.state;
    const {
      signUp,
      heading,
      buttonText,
      errors,
      history,
      removeError
    } = this.props;

    history.listen(() => {
      removeError();
    });

    return (
      <div className="auth">
      <form onSubmit={this.handleSubmit} className="authForm">
        <h2>{heading}</h2>
        {errors.message && (
          <div className="alert alert-danger">{errors.message}</div>
        )}
        <label htmlFor="email">E-mail</label>
        <input
          autoComplete="off"
          className="form-control"
          id="email"
          name="email"
          onChange={this.handleChange}
          type="text"
          value={email}
        />
        <label htmlFor="password">Password</label>
        <input
          autoComplete="off"
          className="form-control"
          id="password"
          name="password"
          onChange={this.handleChange}
          type="password"
          value={password}
        />
        {signUp && (
          <div>
            <label htmlFor="username">Username</label>
            <input
              autoComplete="off"
              className="form-control"
              id="username"
              name="username"
              onChange={this.handleChange}
              type="text"
              value={username}
            />
          </div>
        )}
        <button
          type="submit"
          className="btn btn-primary btn-block btn-md"
        >
          {buttonText}
        </button>
      </form>
      </div>
    );
  }
}
AuthForm.propTypes = {
  buttonText: PropTypes.string,
  errors: PropTypes.object,
  heading: PropTypes.string,
  history: PropTypes.object,
  onAuth: PropTypes.func,
  signIn: PropTypes.bool,
  removeError: PropTypes.func
};

export default AuthForm;
