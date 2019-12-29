import React, { Component } from 'react';
import axios from 'axios';
import { apiCall } from "../services/api";
import { connect } from "react-redux";
import { changePassword } from "../store/actions/auth"

class ChangePasswordForm extends Component {
  constructor (props) {
    super(props);
    const { currentUser } = this.props
    this.state = {
      currentUser,
      currentPassword: "",
      newPassword: "",
      newPasswordConfirmed: "",
      message: ""
    }
  }

  resetMessage = () => {
    this.setState({
      message: ""
    })
  }

  submitChangePassword = e => {
    e.preventDefault()
    if (this.state.newPassword !== this.state.newPasswordConfirmed) {
      this.setState({
        message: "New password and password confirmation do not match. Please try again.",
        currentPassword: "",
        newPassword: "",
        newPasswordConfirmed: ""
      })
      setTimeout(this.resetMessage, 3000)
      return
    }

    if (this.state.currentPassword === this.state.newPassword) {
      this.setState({
        message: "Choose a new password.",
        currentPassword: "",
        newPassword: "",
        newPasswordConfirmed: ""
      })
      setTimeout(this.resetMessage, 3000)
      return
    }

    this.props.changePassword(this.state)
      .then(res => {
        if (res.error === "Invalid Email/Password.") {
          this.setState({
            message: "Invalid Password. Try again",
            currentPassword: "",
            newPassword: "",
            newPasswordConfirmed: ""
          })
          setTimeout(this.resetMessage, 3000)
        }
        if (res === "Password Updated") {
          this.setState({
            message: "Password Successfully Changed",
            currentPassword: "",
            newPassword: "",
            newPasswordConfirmed: ""
          })
          setTimeout(this.resetMessage, 3000)
        }
      })
  }

  render () {
    return (
      <form className="changePasswordForm" onSubmit={this.submitChangePassword}>
      <p>Change your password</p>
        <input
          required
          type="password"
          placeholder="Current Password"
          className="form-control"
          value={this.state.currentPassword}
          onChange={e => this.setState({ currentPassword: e.target.value })}
        />
        <input
          required
          type="password"
          placeholder="New Password"
          className="form-control"
          value={this.state.newPassword}
          onChange={e => this.setState({ newPassword: e.target.value })}
        />
        <input
          required
          type="password"
          placeholder="Re-Enter New Password"
          className="form-control"
          value={this.state.newPasswordConfirmed}
          onChange={e => this.setState({ newPasswordConfirmed: e.target.value })}
        />

          <button className="btn btn-primary" type='submit'>
            Save
          </button>
          <p>{this.state.message}</p>
      </form>
    )
  }

}

function mapStateToProps(state) {
  return {
    errors: state.errors,
    currentUser: state.currentUser.user.id
  };
}

export default connect(mapStateToProps, { changePassword })(ChangePasswordForm);
