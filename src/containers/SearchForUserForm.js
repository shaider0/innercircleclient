import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom"
import { searchForUser } from "../store/actions/users"
import { submitFriendRequest } from "../store/actions/friendRequests"
import DefaultProfileImg from "../images/default-profile-image.jpg";

// this.state.user refers to the user being searched for

class SearchForUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      currentUser: this.props.currentUser
    }
  }

  handleSearch = event => {
    event.preventDefault();
    this.props.searchForUser(this.state)
  };

  resetMessage = () => {
    this.setState({
      message: ""
    })
  }

  handleSubmitFriendRequest = event => {
    event.preventDefault();
    const requestorId = this.props.currentUser.user.id
    const recipientId = this.props.user._id
    this.props.submitFriendRequest(requestorId, recipientId)
      .then(res => {
        if(res ==="success") {
          this.setState({
            username: "",
            message: "Friend Request Sent"
          });
        }
      })
      .then(setTimeout(this.resetMessage, 10000))
    };

  render() {
    let user = this.props.user
    let displayedResult
    if (!user) {
      displayedResult = ""
    }

    if (user.message === "friend request already sent") {
      displayedResult = <div>Friend request already sent</div>
    }

    if (user.message === "user not found") {
      displayedResult = <div>User not found</div>
    }

    if (user.message === "user is already a friend") {
      displayedResult =
        <div>
          <p>&#10004; Friends</p>
          <img
            src={user.user.profileImageUrl || DefaultProfileImg}
            alt={user.user.username}
            height="100"
            width="100"
            className="timeline-image"
          />
          {user.user.username}
        </div>
    }
    if (user.message === "this is you") {
      displayedResult =
        <div>
          <img
            src={user.user.profileImageUrl || DefaultProfileImg}
            alt={user.user.username}
            height="100"
            width="100"
            className="timeline-image"
          />
          <Link to="/">{user.user.username}</Link>
        </div>
    }
    if (Object.keys(user).includes("username")) {
      displayedResult =
        <div>
          <img
            src={user.profileImageUrl || DefaultProfileImg}
            alt={user.username}
            height="100"
            width="100"
            className="timeline-image"
          />
          <p>{user.username}</p>
          <button onClick={this.handleSubmitFriendRequest}className="btn btn-primary">Send Friend Request</button>
        </div>
    }

    return (
      <div className = "friendsSearch">
        <h3>Friends Search</h3>
        <form onSubmit={this.handleSearch}>
          {this.props.errors.message && (
            <div className="alert alert-danger">{this.props.errors.message}</div>
          )}
          <input
            required
            type="text"
            placeholder="search by username"
            className="form-control"
            value={this.state.username}
            onChange={e => this.setState({ username: e.target.value })}
          />
          <button type="submit" className="btn btn-primary">
            Search
          </button>
        </form>
        {displayedResult}
        {this.state.message}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    errors: state.errors,
    user: state.users
  };
}

export default connect(mapStateToProps, { searchForUser, submitFriendRequest })(SearchForUser);
