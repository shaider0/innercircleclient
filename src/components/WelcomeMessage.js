import React, { Component } from "react";
import { connect } from "react-redux";
import { closeWelcomeMessage } from "../store/actions/currentUser"

class WelcomeMessage extends Component {
  constructor(props) {
    super(props)
    this.closeMessage = this.closeMessage.bind(this)
  }

  closeMessage() {
    this.props.closeWelcomeMessage()
  }

  render() {
    return (
      <div className="welcomeMessage">
      <button onClick={this.closeMessage} style={{"float": "right"}} className="btn btn-danger">Don't Show This Message Again</button>
      <em>
        <h4>Welcome to InnerCircle!</h4>
        <p>To get started:</p>
        <ol>
          <li>Add a profile picture</li>
          <li>Search for friends by username and send friend requests</li>
          <li>Accept incoming friend requests</li>
          <li>Add a new post to share what's on your mind. Include an image if you'd like!</li>
          <li>Send messages to your friends</li>
          <li>Have fun!</li>
        </ol>
      </em>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
  }
}

export default connect(mapStateToProps, { closeWelcomeMessage })(WelcomeMessage)
