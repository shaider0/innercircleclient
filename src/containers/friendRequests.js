import React, { Component } from "react";
import { connect } from "react-redux";
import DefaultProfileImg from "../images/default-profile-image.jpg";
import { getFriendRequests } from "../store/actions/friendRequests"


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

  render() {
    const { friendRequests } = this.props
    console.log('friend requests are', friendRequests)
    return (
      <div>
        {friendRequests.map((request) => {
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
              <button className="btn btn-primary">Accept</button>
              <button className="btn btn-danger">Ignore</button>
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

export default connect(mapStateToProps, { getFriendRequests })(FriendRequests);
