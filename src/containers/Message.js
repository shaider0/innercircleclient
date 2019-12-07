import React, { Component } from "react";
import { connect } from "react-redux";
import { postNewMessage } from "../store/actions/messages"

class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipientUsername: "",
      message: `Hey!`
      // message: `Hey! I've been recommending ${this.props.location.state.title} and I thought you might like it. -${this.props.currentUsername}`
    }
  }

  handleNewMessage = event => {
    event.preventDefault()
    this.props.postNewMessage(this.state)
  }

  render() {
    return (
      <div>
      <form onSubmit={this.handleNewMessage}>
        <h3>Suggest To A Friend</h3>
        <label>To: </label>
        <span>
          <input
            type="text"
            placeholder="username"
            value={this.state.recipientUsername}
            onChange={e => this.setState({ recipientUsername: e.target.value })}
            className="form-control"
          />
          <label>Message: </label>
          <input
            type="textArea"
            placeholder="message"
            value={this.state.message}
            onChange={e => this.setState({ message: e.target.value })}
            className="form-control"
          />
          <button>
            Send
          </button>
        </span>
      </form>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    errors: state.errors,
    currentUsername: state.currentUser.user.username
  };
}

export default connect(mapStateToProps, { postNewMessage })(Message);
