import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom"
import { addNewMessage } from "../store/actions/messages"

class CreateMessageForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      senderUsername: this.props.currentUsername,
      recipientUsername: "",
      content: "",
      UImessage: ""
    }
  }

  resetMessage = () => {
    this.setState({
      UImessage: ""
    })
  }

  handleNewMessage = event => {
    event.preventDefault()
    this.props.addNewMessage(this.state)
      .then(res => {
        return res
      })
      .then(res => {
        if(res ==="success") {
          this.setState({
            recipientUsername: "",
            content: "",
            UImessage: "Message Sent!"
        });
      }
        else if(res === "user not found") {
          this.setState({
            recipientUsername: "",
            content: "",
            UImessage: "User not found. Please try again."
        });
      }
        else if(res === "user not a friend") {
          this.setState({
            recipientUsername: "",
            content: "",  
            UImessage: 'Please send the user a friend request before trying to send a message.'
          })
        }
    })
    .then(setTimeout(this.resetMessage, 10000))
  }

  render() {
    return (
      <form onSubmit={this.handleNewMessage} className="createMessageForm">
        <h5>Send A New Message</h5>
        <label>To: </label>
        <span>
          <input
            type="text"
            placeholder="Username"
            value={this.state.recipientUsername}
            onChange={e => this.setState({ recipientUsername: e.target.value })}
            className="form-control"
          />
          <input
            type="textarea"
            placeholder="Enter your message here"
            value={this.state.content}
            onChange={e => this.setState({ content: e.target.value })}
            className="form-control"
          />
          <button className="btn btn-primary">
            Send
          </button>
          {this.state.UImessage ? <p className="uiMessage">{this.state.UImessage}</p> : null}
        </span>
      </form>
    )
  }
}

function mapStateToProps(state) {
  return {
    errors: state.errors,
    currentUsername: state.currentUser.user.username
  };
}

export default connect(mapStateToProps, { addNewMessage })(CreateMessageForm)
