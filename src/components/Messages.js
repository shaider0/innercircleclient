import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom"

import { fetchMessages, removeMessage, updateMessage } from "../store/actions/messages";

import Message from './Message'

class Messages extends Component{
  constructor(props) {
    super(props)
    this.state = {
    }
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  componentDidMount() {
    const { currentUser } = this.props
    this.props.fetchMessages(currentUser);
  }

  render(){
    const { messages, removeMessage, currentUser } = this.props;
    let items = [ ...messages ]
    let sortedItems = items.sort((a, b) => (a.updatedAt > b.updatedAt) ? -1 : 1)

    let messagesList = sortedItems.map(m => {
      return (
        <Message
        className="message"
        key={m._id}
        date={m.updatedAt}
        content={m.content}
        sender={m.sender}
        recipient={m.recipient}
        messageId={m._id}
        userId={m.user._id}
        removeMessage={removeMessage.bind(this, m.user._id, m._id)}
        currentUser={currentUser}
        isCorrectUser={currentUser === m.user._id || currentUser === m.user}
      />)
    })

    return(
      <div className="messages">
        <Link to="/users/:id/create-message-form" className="btn btn-primary">
            Create New Message
        </Link>
        <ul>
          {messagesList}
        </ul>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser.user.id,
    messages: state.messages,
    errors: state.errors
  }
}

export default connect(mapStateToProps, {
  fetchMessages,
  removeMessage
})(Messages);
