import React, { Component } from 'react';
import axios from 'axios';
import { apiCall } from "../services/api";
import { connect } from "react-redux";
import { updateUserProfileImage } from "../store/actions/currentUser"

class ProfilePictureForm extends Component {
  constructor () {
    super();
    this.state = {
      image: null
    }
  }

  submitProfileImage = e => {
    e.preventDefault()
    this.props.updateUserProfileImage(this.state)
  }

  render () {
    return (
      <form onSubmit={this.submitProfileImage}>
        <input
          label='upload file'
          type='file'
          onChange={e => this.setState({ image: e.target.files })}/>

        <div>
          <button className="btn btn-primary" type='submit'>
            Save
          </button>
        </div>

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

export default connect(mapStateToProps, { updateUserProfileImage })(ProfilePictureForm);
