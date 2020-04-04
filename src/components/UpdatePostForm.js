import React, { Component } from "react";
import { connect } from "react-redux";
import { updatePost } from "../store/actions/posts";
import CreatePostForm from "./CreatePostForm"

class UpdatePostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: this.props.location.state.content,
      imageUrl: this.props.location.state.imageUrl,
      userId: this.props.location.state.userId,
      postId: this.props.location.state.postId
    };
  }

  render() {
    return (
      <div className="update-form">
      <h3>Update Item</h3>
        <CreatePostForm
          type="update" state={this.state}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    errors: state.errors
  };
}

export default connect(mapStateToProps, { updatePost })(UpdatePostForm);
