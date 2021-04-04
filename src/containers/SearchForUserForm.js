import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom"
import { searchForUser } from "../store/actions/users"
import { removeUser } from "../store/actions/users"
import { submitFriendRequest } from "../store/actions/friendRequests"
import DefaultProfileImg from "../images/default.png";

// this.state.user refers to the user being searched for

class SearchForUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      currentUser: this.props.currentUser,
      displayedResult: ""
    }
  }

  handleSearch = event => {
    event.preventDefault();
    this.props.searchForUser(this.state)
      .then(
        (user) => {
          if (user.message === "friend request already sent") {
            this.setState({
              displayedResult: (<div>Friend request already sent</div>)
            })
          }
          if (user.message === "user not found") {
            this.setState({
              displayedResult: (<div>User not found</div>)
            })
          }
          if (user.message === "user is already a friend") {
            this.setState({
              displayedResult: (<div>
                <p>&#10004; Friends</p>
                <img
                  src={user.user.profileImageUrl || DefaultProfileImg}
                  alt={user.user.username}
                  height="100"
                  width="100"
                  className="timeline-image"
                />
                {user.user.username}
              </div>)
            })
          }
          if (user.message === "this is you") {
            this.setState({
              displayedResult: (
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
              )
            })
          }
          if (Object.keys(user).includes("username")) {
            this.setState({
              displayedResult: (<div>
                <img
                  src={user.profileImageUrl || DefaultProfileImg}
                  alt={user.username}
                  height="100"
                  width="100"
                  className="timeline-image"
                />
                <p>{user.username}</p>
                <button onClick={this.handleSubmitFriendRequest} className="btn btn-primary">Send Friend Request</button>
              </div>)
            })
          }
        })
  }

  resetMessage = () => {
    this.setState({
      message: ""
    })
  }

  handleSubmitFriendRequest = event => {
    event.preventDefault();
    const { removeUser } = this.props
    const requestorId = this.props.currentUser.user.id
    const recipientId = this.props.user._id
    this.props.submitFriendRequest(requestorId, recipientId)
      .then(res => {
        if (res === "success") {
          this.setState({
            username: "",
            message: "Friend Request Sent"
          });
        }
      })
      .then(this.props.removeUser)
      .then(this.setState({
        displayedResult: ""
      }))
      .then(setTimeout(this.resetMessage, 10000))
  };

  render() {

    return (
      <div className="friendsSearch">
        <h5 className="centered-title">Add Friends</h5>
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
        {this.state.displayedResult}
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

export default connect(mapStateToProps, { searchForUser, submitFriendRequest, removeUser })(SearchForUser);
