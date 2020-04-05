import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom"
import { updatePost, addNewPost } from "../store/actions/posts";


class PostForm extends Component {
  constructor(props) {
    super(props);
    if(this.props.type === "update") {
      this.state = this.props.state
    } else {
      this.state = {
        content: "",
        image: null,
        message: ""
      }
    }
  }

  resetMessage = () => {
    this.setState({
      message: ""
    })
  }

  handleNewPost = event => {
    event.preventDefault();

  this.props.addNewPost(this.state)
    .then(res => {
      if(res==="success") {
    this.setState({
      content: "",
      image: null,
      message: "Post Successfully Added"
        });
      }
    })
    .then(setTimeout(this.resetMessage, 10000))
  };

  handleUpdatedPost = event => {
    event.preventDefault();
    this.props.updatePost(this.state)
    .then(this.setState({
      content: "",
      image: null
    }))
    .then(this.props.history.push("/"))
  };

  render() {

    const { posts } = this.props

    let handler = this.handleNewPost
    let buttonText = "Add Post"
    if(this.props.type === "update") {
      buttonText = "Save Updates"
      handler = this.handleUpdatedPost
    }

    return (
      <form className="postForm" onSubmit={handler}>

        {this.props.errors.message && (
          <div className="alert alert-danger">{this.props.errors.message}</div>
        )}

        <h5>Share something with your friends:</h5>

        <textarea
          required
          type="text"
          placeholder="Type your post here"
          className="form-control"
          value={this.state.content}
          onChange={e => this.setState({ content: e.target.value })}
        />

        <p>Optional - Upload a Photo:</p>

        <input
          type="file"
          onChange={e => this.setState({ image: e.target.files})}
        />

        <button type="submit" className="btn btn-primary">
          {buttonText}
        </button>

        {this.state.message ? <p className="uiMessage">{this.state.message}</p> : null}

      </form>
    )
  }
}

function mapStateToProps(state) {
  return {
    errors: state.errors,
    posts: state.posts
  };
}

export default withRouter(connect(mapStateToProps, { addNewPost, updatePost })(PostForm));
