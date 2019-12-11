import React from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Homepage from "../components/Homepage";
import AuthForm from "../components/AuthForm";
import { authUser } from "../store/actions/auth";
import { removeError } from "../store/actions/errors";
import withAuth from "../hocs/withAuth";
import UpdateMovieForm from "../containers/UpdateMovieForm";
import UpdateMealForm from "../containers/UpdateMealForm";
import UpdateTvshowForm from "../containers/UpdateTvshowForm";
import UsersOwnContent from "../containers/UsersOwnContent"
import FriendRequests from "./FriendRequests"
import Friends from "./Friends"
import FileUpload from "./FileUpload"
import Settings from "./Settings"
import PersonalRecommendationForm from "./PersonalRecommendationForm"
import PersonalRecommendations from "./PersonalRecommendations"

const Main = props => {
  const { authUser, errors, removeError, currentUser } = props;
  return (
    <div className="container">
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
                buttonText="Log in"
                heading="Welcome Back."
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
                heading="Join Warbler today."
                {...props}
              />
            );
          }}
        />
        <Route
          path="/users/:id/personalRecommendations"
          component={PersonalRecommendations}
        />
        <Route
          path="/users/:id/personalRecommendation"
          component={PersonalRecommendationForm}
        />
        <Route
          path="/users/:id/settings"
          component={Settings}
        />
        <Route
          path="/users/:id/movies/:id/update"
          component={UpdateMovieForm}
        />
        <Route
          path="/users/:id/tvshows/:id/update"
          component={UpdateTvshowForm}
        />
        <Route
          path="/users/:id/meals/:id/update"
          component={UpdateMealForm}
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
