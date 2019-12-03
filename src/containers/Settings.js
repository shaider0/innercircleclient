import React, { Component } from "react";
import UserAside from "../components/UserAside";
import { connect } from "react-redux";
import FileUpload from './FileUpload'


class Settings extends Component {
  constructor(props) {
    super(props)
  }
  render(){
    const { currentUser } = this.props
    console.log('url is ', currentUser.user)
    return (
      <div>
        <UserAside
          profileImageUrl={currentUser.user.profileImageUrl}
          username={currentUser.user.username}
        />
        <p>Upload Profile Picture</p>
        <FileUpload />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  };
}

export default connect(mapStateToProps, {})(Settings);
