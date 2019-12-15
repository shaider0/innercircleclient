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
    return (
      <nav className="navbar navbar-expand">
        <div className="container-fluid">
          <div className="navbar-header">
          <Link to="/" className="navbar-brand">
            <img src={Logo} alt="InnerCircle Home" />
          </Link>
          </div>
          {this.props.currentUser.isAuthenticated ? (
            <ul className="nav navbar-nav navbar-right">
              <li>
                <Link
                  to={`/users/${this.props.currentUser.user.id}/personalRecommendations`}
                >
                  Personal Recommendations
                </Link>
              </li>
              <li>
                <Link
                  to={`/users/${this.props.currentUser.user.id}/settings`}
                >
                  Settings
                </Link>
              </li>

              <li>
                <Link
                  to={`/users/${this.props.currentUser.user.id}/friends`}
                >
                  Friends
                </Link>
              </li>
              <li>
                  <a onClick={this.logout}>Log out</a>
              </li>
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
