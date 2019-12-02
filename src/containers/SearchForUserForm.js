import React, { Component } from "react";
import { connect } from "react-redux";
import { searchForUser } from "../store/actions/users"
import { submitFriendRequest } from "../store/actions/friendRequests"
import DefaultProfileImg from "../images/default-profile-image.jpg";

class SearchForUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      currentUser: this.props.currentUser
    }
  }

  handleSubmit = event => {
    event.preventDefault();
    this.props.searchForUser(this.state);
  };

  handleFriendRequest = event => {
    event.preventDefault();
    console.log('friend request sent')
    console.log('requestor is', this.props.currentUser.user.id)
    const requestorId = this.props.currentUser.user.id
    console.log('recipient is: '+ this.props.user._id)
    const recipientId = this.props.user._id
    this.props.submitFriendRequest(requestorId, recipientId)
  }

  render() {
    const { user } = this.props
    let result = <div></div>
    if (user.message === "user not found") {
      result = <div>User not found</div>
    }
    if (Object. keys(user).includes("username")) {
      result =
        <div>
          User Found!
          <img
            src={user.profileImageUrl || DefaultProfileImg}
            alt={user.username}
            height="100"
            width="100"
            className="timeline-image"
          />
          <p>Username: {user.username}</p>
          <button onClick={this.handleFriendRequest}className="btn btn-primary">Send Friend Request</button>
        </div>
    }

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          {this.props.errors.message && (
            <div className="alert alert-danger">{this.props.errors.message}</div>
          )}
          <label>Add A Friend</label>
          <input
            type="text"
            placeholder="search by username"
            className="form-control"
            value={this.state.username}
            onChange={e => this.setState({ username: e.target.value })}
          />
          <button type="submit" className="btn btn-success">
            Search
          </button>
        </form>
        {result}
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