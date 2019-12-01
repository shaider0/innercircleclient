import React, { Component } from "react";
import { connect } from "react-redux";
import DefaultProfileImg from "../images/default-profile-image.jpg";
import { getFriends } from "../store/actions/friends"

class Friends extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: this.props.currentUser.id
    }
  }

  componentDidMount() {
    const { getFriends } = this.props
    getFriends(this.state.currentUser)
  }

  render() {
    const { friends } = this.props
    return (
      <div>
      <p>Friends List</p>
      {friends.map((friend) => {
        return (
          <div key={friend._id}>
            <p>
            <img
              src={friend.profileImageUrl || DefaultProfileImg}
              alt={friend.username}
              height="100"
              width="100"
              className="timeline-image"/>
            {friend.username}
            </p>
          </div>
        )
      })}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser.user,
    friends: state.friends,
    errors: state.errors
  };
}

export default connect(mapStateToProps, { getFriends })(Friends);
