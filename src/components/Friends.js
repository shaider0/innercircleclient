import React, { Component } from "react";
import { connect } from "react-redux";
import DefaultProfileImg from "../images/default-profile-image.jpg";
import { getFriends, deleteFriend } from "../store/actions/friends"
import FriendRequests from "./FriendRequests"
import SearchForUserForm from "./SearchForUserForm"
import { Link } from "react-router-dom"

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

  handleRemoveFriend = (event) => {
    event.preventDefault()
    const currentUserId = this.state.currentUser
    const friendId = event.target.id
    this.props.deleteFriend(currentUserId, friendId)
  }

  render() {
    const { friends } = this.props

    let friendsList = friends.map(friend => (
      <div key={friend.id}>
        <p>
          <img
            src={friend.profileImageUrl || DefaultProfileImg}
            alt={friend.username}
            className="timeline-image"/>
            {friend.username}
        </p>
        <button className="btn btn-danger" id={friend.id} onClick={this.handleRemoveFriend}>Remove Friend</button>
      </div>
      ))

    return (
      <div className="friends">
        <SearchForUserForm/>
        <FriendRequests />
        <div className="friendsList">
          <h5 className="centered-title">Friends List</h5>
          {friends.length === 0 ? <p>Get started by adding friends using the search tool above </p> : friendsList}
          </div>
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

export default connect(mapStateToProps, { getFriends, deleteFriend })(Friends);
