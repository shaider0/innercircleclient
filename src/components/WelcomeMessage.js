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
        <h5 className="getstarted">To get started:</h5>
          <p>-Add a profile picture</p>
          <p>-Search for friends by username and send friend requests</p>
          <p>-Accept incoming friend requests</p>
          <p>-Add a new post to share what's on your mind. Include an image if you'd like!</p>
          <p>-Send messages to your friends</p>
          <p>-Have fun!</p>
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
