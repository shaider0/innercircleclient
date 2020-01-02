import React, { Component } from "react";
import { connect } from "react-redux";
import DefaultProfileImg from "../images/default-profile-image.jpg";
import { acceptFriendRequest, rejectFriendRequest, getFriendRequests } from "../store/actions/friendRequests"
import { getFriendRequestsSent } from "../store/actions/friendRequestsSent"
import { getFriends } from "../store/actions/friends"

class FriendRequests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: this.props.currentUser.id
    }
  }

  componentDidMount() {
    let currentUser = this.state.currentUser
    const { getFriendRequests, getFriendRequestsSent } = this.props
    getFriendRequests(currentUser)
    getFriendRequestsSent(currentUser)
  }

  handleAccept = (event) => {
    event.preventDefault()
    const userId = this.state.currentUser
    const requestId = event.target.id
    const { acceptFriendRequest, getFriends, getFriendRequests } = this.props
    acceptFriendRequest(userId, requestId)
      .then(getFriends(userId))
      .then(getFriendRequests(userId))
  }

  handleReject = (event) => {
    event.preventDefault()
    const userId = this.state.currentUser
    const requestId = event.target.id
    const { rejectFriendRequest } = this.props
    rejectFriendRequest(userId, requestId)
  }

  render() {
    let receivedRequests
    let sentRequests

    const { friendRequests, friendRequestsSent } = this.props
    console.log("friend requests are (to see id)", friendRequests)
    const noRequestsMessage = (
      <div>
        <p>None at this time.</p>
      </div>
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
          </div>
        )
      })
      )
    }

    return (
      <div className="friendRequests">
        <h3>Friend Requests</h3>
        <div>
          <p>Sent</p>
          {friendRequestsSent.length > 0 ? sentRequests : noRequestsMessage}
        </div>

          <div>
            <p>Received</p>
            {friendRequests.length > 0 ? receivedRequests : noRequestsMessage}
          </div>

      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser.user,
    friendRequests: state.friendRequests,
    friendRequestsSent: state.friendRequestsSent,
    errors: state.errors
  };
}

export default connect(mapStateToProps, { getFriendRequests, acceptFriendRequest, rejectFriendRequest, getFriendRequestsSent, getFriends })(FriendRequests);
