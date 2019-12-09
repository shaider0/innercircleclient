import React, { Component } from "react";
import { connect } from "react-redux";
import DefaultProfileImg from "../images/default-profile-image.jpg";

class UserAside extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const currentUser = this.props
    return (
      <aside className="col-sm-2">
        <div className="panel panel-default">
          <div className="panel-body">
            <img
              src={currentUser.profileImageUrl || DefaultProfileImg}
              alt={currentUser.username}
              width="200"
              height="200"
              className="img-thumbnail"
            />
            <p>@{currentUser.username}</p>
          </div>
        </div>
      </aside>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser.user.id
  }
}

export default connect(mapStateToProps, {})(UserAside)
