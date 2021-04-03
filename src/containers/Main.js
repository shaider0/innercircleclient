import React from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Homepage from "../components/Homepage";
import AuthForm from "../components/AuthForm";
import { authUser } from "../store/actions/auth";
import { removeError } from "../store/actions/errors";
import withAuth from "../hocs/withAuth";
import UpdateMovieForm from "./UpdateMovieForm";
import UpdateRestaurantForm from "./UpdateRestaurantForm";
import UpdateMealForm from "./UpdateMealForm";
import UpdateDiscoveryForm from "./UpdateDiscoveryForm";
import UpdateTvshowForm from "./UpdateTvshowForm";
import UpdateDestinationForm from "./UpdateDestinationForm";
import FriendRequests from "./FriendRequests"
import Friends from "./Friends"
import Settings from "./Settings"
import PersonalRecommendationForm from "./PersonalRecommendationForm"
import PersonalRecommendations from "./PersonalRecommendations"
import CreateItem from "./CreateItem"

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
                heading="Already signed up?"
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
          path="/users/:id/restaurants/:id/update"
          component={UpdateRestaurantForm}
        />
        <Route
          path="/users/:id/meals/:id/update"
          component={UpdateMealForm}
        />
        <Route
          path="/users/:id/discoveries/:id/update"
          component={UpdateDiscoveryForm}
        />
        <Route
          path="/users/:id/destinations/:id/update"
          component={UpdateDestinationForm}
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
