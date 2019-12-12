import React, { Component } from 'react';
import axios from 'axios';
import { apiCall } from "../services/api";
import { connect } from "react-redux";
import { updateUserProfileImage } from "../store/actions/users"

class FileUpload extends Component {
  constructor () {
    super();
    this.state = {
      file: null
    };
  }

  submitFile = (event) => {
    event.preventDefault();
    const { currentUser, updateUserProfileImage } = this.props

    const formData = new FormData();

    formData.append('file', this.state.file[0]);
    axios.post(`/image-upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(res => {
      let url = res.data.Location
      let user = currentUser
      updateUserProfileImage(user, url)
    })
    .catch(error => {
      // handle your error
    });
  }

  handleFileUpload = (event) => {
    this.setState({file: event.target.files});
  }

  render () {
    return (
      <form onSubmit={this.submitFile}>
        <input label='upload file' type='file' onChange={this.handleFileUpload}/>
        <div><button className="btn btn-primary" type='submit'>Save</button></div>
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

export default connect(mapStateToProps, { updateUserProfileImage })(FileUpload);
