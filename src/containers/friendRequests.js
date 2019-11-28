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
        {friendRequests.map((friend) => {
          return (
            <p>{friend}</p>
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
