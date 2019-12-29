import React, { Component } from "react";
import UserAside from "../components/UserAside";
import { connect } from "react-redux";
import ProfilePictureForm from './ProfilePictureForm'
import ChangePasswordForm from './ChangePasswordForm'
import { withRouter } from "react-router-dom";


class Settings extends Component {
  constructor(props) {
    super(props)
  }

  render(){
    const { currentUser } = this.props
    console.log('user', currentUser.user.profileImageUrl)
    return (
      <div className="settings">
        <h4>{currentUser.user.username}'s Settings</h4>
        <div className="profilePictureForm">
          <p>Set/Change Profile Picture</p>
          <img
            src={currentUser.user.profileImageUrl}
            className="changeProfilePicImage"
          />
          <ProfilePictureForm />
        </div>

        <div>
          <ChangePasswordForm />
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  };
}

export default withRouter(connect(mapStateToProps, {})(Settings));
