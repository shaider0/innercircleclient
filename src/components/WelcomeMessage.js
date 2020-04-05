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
          <li className="welcome-msg-li">Add a profile picture</li>
          <li className="welcome-msg-li">Search for friends by username and send friend requests</li>
          <li className="welcome-msg-li">Accept incoming friend requests</li>
          <li className="welcome-msg-li">Add a new post to share what's on your mind. Include an image if you'd like!</li>
          <li className="welcome-msg-li">Send messages to your friends</li>
          <li className="welcome-msg-li">Have fun!</li>
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
