import React, { Component } from "react";
import { connect } from "react-redux";
import DefaultProfileImg from "../images/default-profile-image.jpg";
import { getFriendRequests, acceptFriendRequest, rejectFriendRequest } from "../store/actions/friendRequests"
import { getFriendRequestsSent, cancelFriendRequestSent } from "../store/actions/friendRequestsSent"


class FriendRequests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: this.props.currentUser
    }
  }

  componentDidMount() {
    const currentUserId = this.state.currentUser
    this.props.getFriendRequests(currentUserId)
    this.props.getFriendRequestsSent(currentUserId)
  }

  handleAccept = (event) => {
    event.preventDefault()
    const currentUserId = this.state.currentUser
    const requestId = event.target.id
    this.props.acceptFriendRequest(currentUserId, requestId)
  }

  handleReject = (event) => {
    event.preventDefault()
    const currentUserId = this.state.currentUser
    const requestId = event.target.id
    this.props.rejectFriendRequest(currentUserId, requestId)
  }

  handleCancel = (event) => {
    event.preventDefault()
    const currentUserId = this.state.currentUser
    const requestId = event.target.id
    this.props.cancelFriendRequestSent(currentUserId, requestId)
  }

  render() {
    let receivedRequests = null
    let sentRequests = null

    const { friendRequests, friendRequestsSent } = this.props

    const noRequestsMessage = (
      <p>None at this time.</p>
    )

    if (friendRequests.length > 0) {
      receivedRequests = (
        friendRequests.map(request => {
          return (
            <div key={request._id}>
              <p>
              <img
                src={request.requestor.profileImageUrl || DefaultProfileImg}
                alt={request.requestor.username}
                height="100"
                width="100"
                className="timeline-image"/>
              {request.requestor.username}
              </p>
              <button id={request._id} onClick={this.handleAccept} className="btn btn-primary">Accept</button>
              <button id={request._id} onClick={this.handleReject}className="btn btn-danger">Ignore</button>
            </div>
          )
        })
      )
    }

    if (friendRequestsSent.length > 0) {
      sentRequests = (friendRequestsSent.map((request) => {
        return (
          <div key={request._id}>
            <p>
            <img
              src={request.recipient.profileImageUrl || DefaultProfileImg}
              alt={request.recipient.username}
              height="100"
              width="100"
              className="timeline-image"/>
            {request.recipient.username}
            </p>
            <button id={request._id} onClick={this.handleCancel} className="btn btn-primary">Cancel Request</button>
          </div>
        )
      })
      )
    }

    return (
      <div className="friendRequests">
        <h3>Friend Requests</h3>

        <div>
          <h5>Sent Requests</h5>
          {sentRequests ? sentRequests : noRequestsMessage}
        </div>

        <div>
          <p>Received Requests</p>
          {receivedRequests ? receivedRequests : noRequestsMessage}
        </div>

      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser.user.id,
    friendRequests: state.friendRequests,
    friendRequestsSent: state.friendRequestsSent,
    errors: state.errors
  };
}

export default connect(mapStateToProps, { getFriendRequests, acceptFriendRequest, rejectFriendRequest, getFriendRequestsSent, cancelFriendRequestSent })(FriendRequests);
