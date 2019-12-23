import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../store/actions/auth";
import Logo from "../images/inner-circle-logo.png";

class Navbar extends Component {
  logout = e => {
    e.preventDefault();
    this.props.logout();
    document.location.href="/"
  };

  render() {
    const { currentUser } = this.props;
    return (
      <nav className="navbar navbar-expand">
        <div className="container-fluid">
          <div className="navbar-header">
          </div>
          {this.props.currentUser.isAuthenticated ? (
            <ul className="nav navbar-nav navbar-right">
              <li>
                <Link
                  to="/"
                >
                  <i class="fas fa-home"></i>
                </Link>
              </li>
              <li>
                <Link
                  to={`/users/${this.props.currentUser.user.id}/personalRecommendations`}
                >
                  <i class="far fa-envelope"></i>
                </Link>
              </li>

              <li>
                <Link
                  to={`/users/${this.props.currentUser.user.id}/friends`}
                >
                  <i class="fas fa-users"></i>
                </Link>
              </li>

              <li>
                <Link
                  to={`/users/${this.props.currentUser.user.id}/settings`}
                >
                  <i class="fas fa-cog"></i>
                </Link>
              </li>

              <li>
                  <a onClick={this.logout}><i class="fas fa-sign-out-alt"></i></a>
              </li>

              {currentUser.user.profileImageUrl ?
              <li>
                <div className="navImageContainer">
                  <img
                    src={currentUser.user.profileImageUrl}
                    className="navImage"
                  />
                </div>
              </li>
              : null
              }
            </ul>
          ) : (
            <ul className="nav navbar-nav navbar-right">
              <li>
                <Link to="/signup">Sign up</Link>
              </li>
              <li>
                <Link to="/signin">Log in</Link>
              </li>
            </ul>
          )}
        </div>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  };
}

export default connect(mapStateToProps, { logout })(Navbar);
