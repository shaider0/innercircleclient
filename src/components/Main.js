import React from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Homepage from "../components/Homepage";
import AuthForm from "../components/AuthForm";
import { authUser } from "../store/actions/auth";
import { removeError } from "../store/actions/errors";
import withAuth from "../hocs/withAuth";
import CreateItem from "./CreateItem"
import UpdatePostForm from "./UpdatePostForm";
import FriendRequests from "./FriendRequests"
import Friends from "./Friends"
import Settings from "./Settings"

const Main = props => {
  const { authUser, errors, removeError, currentUser } = props;
  return (
    <div className={`main layout ${currentUser.isAuthenticated ? 'hide-background' : null} `}>
      <Switch>
        <Route
          exact
          path="/"
          render={props => <Homepage currentUser={currentUser} {...props} />}
        />
        <Route
          exact
          path="/signin"
          render={props => {
            return (
              <AuthForm
                removeError={removeError}
                errors={errors}
                onAuth={authUser}
                buttonText="Sign in"
                heading="Welcome Back!"
                {...props}
              />
            );
          }}
        />
        <Route
          exact
          path="/signup"
          render={props => {
            return (
              <AuthForm
                removeError={removeError}
                errors={errors}
                onAuth={authUser}
                signUp
                buttonText="Sign me up!"
                heading="Sign Up Now"
                {...props}
              />
            );
          }}
        />
        <Route
          path="/users/:id/create-item"
          component={CreateItem}
        />
        <Route
          path="/users/:id/settings"
          component={Settings}
        />
        <Route
          path="/users/:id/posts/:id/update"
          component={UpdatePostForm}
        />
        <Route
          path="/users/:id/friendRequests"
          component={FriendRequests}
        />
        <Route
          path="/users/:id/friends"
          component={Friends}
        />
      </Switch>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    errors: state.errors
  };
}

export default withRouter(
  connect(mapStateToProps, { authUser, removeError })(Main)
);
