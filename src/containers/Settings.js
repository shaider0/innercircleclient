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
    return (
      <div className="settings">
        <h3 className="light">{currentUser.user.username}'s Settings</h3>
        <div className="profilePictureForm">
          <h5>Set/Change Profile Picture</h5>
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
