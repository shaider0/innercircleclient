import React, { Component } from "react";
import UserAside from "../components/UserAside";
import { connect } from "react-redux";
import ProfilePictureForm from './ProfilePictureForm'
import { withRouter } from "react-router-dom";


class Settings extends Component {
  constructor(props) {
    super(props)
  }

  render(){
    const { currentUser } = this.props
    console.log('user', currentUser.user.profileImageUrl)
    return (
      <div className="profilePictureForm">
        <h5>Set/Change Profile Picture</h5>
        <img
          src={currentUser.user.profileImageUrl}
          className="changeProfilePicImage"
        />
        <ProfilePictureForm />
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
