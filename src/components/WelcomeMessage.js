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
        <button onClick={this.closeMessage} style={{ "float": "right" }} className="btn btn-danger">Don't Show This Message Again</button>
        <em>
          <h4>Welcome! Use InnerCircle to:</h4>
          <ul>
            <li>Send friend requests to your closest friends. Once they accept, you'll be able to see a feed of all their recommendations and bookmarks on your home page.</li>
            <li>Start recommending things you like and bookmarking things you want to try.</li>
            <li>If you have a specific friend who you think will like what you're recommending, send them a personal recommendation</li>
            <li> Add a profile picture</li>
          </ul>
        And that's it! Check back in periodically to see what your friends are up to and add more recommendations for your friends to see.
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
