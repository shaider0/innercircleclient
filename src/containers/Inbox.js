import React, { Component } from "react";
import { connect } from "react-redux";
import MessageItem from "../components/MessageItem"
import { fetchMessages } from "../store/actions/messages"


class Inbox extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { currentUser } = this.props
    this.props.fetchMessages(currentUser)
  }
  render(){
    const { messages } = this.props
    console.log('messages', messages)
    let messagesList = messages.map(m => {
      return (
        <div key={m._id} className="messageItem">
          <MessageItem
            date={m.createdAt}
            sender={m.sender.username}
            message={m.message}
            />
        </div>
      )
    })
  return (
    <div>
      {messagesList}
    </div>
  )
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser.user.id,
    errors: state.errors,
    messages: state.messages
  };
}

export default connect(mapStateToProps, { fetchMessages })(Inbox);
