import React, { Component } from "react";
import { connect } from "react-redux";
import DefaultProfileImg from "../images/default-profile-image.jpg";
import { acceptFriendRequest, rejectFriendRequest, getFriendRequests } from "../store/actions/friendRequests"


class FriendRequests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: this.props.currentUser.id
    }
  }

  componentDidMount() {
    let currentUser = this.state.currentUser
    console.log('curr us is', currentUser)
    const { getFriendRequests } = this.props
    getFriendRequests(currentUser)
  }

  handleAccept = (event) => {
    event.preventDefault()
    const userId = this.state.currentUser
    const requestId = event.target.id
    acceptFriendRequest(userId, requestId)
  }

  handleReject = (event) => {
    event.preventDefault()
    const userId = this.state.currentUser
    const requestId = event.target.id
    rejectFriendRequest(userId, requestId)
  }

  render() {
    const { friendRequests } = this.props
    {if (friendRequests.length === 0) {
      return (
        <div>
          <h3>Friend Requests</h3>
          <p>None at this time.</p>
        </div>
      )
    }}
    return (
      <div>
        {friendRequests.map((request) => {
          return (
            <div key={request._id}>
              <h3>Friend Requests</h3>
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
        })}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser.user,
    friendRequests: state.friendRequests,
    errors: state.errors
  };
}

export default connect(mapStateToProps, { getFriendRequests, acceptFriendRequest, rejectFriendRequest })(FriendRequests);
