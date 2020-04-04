import React from "react";
import { Link } from "react-router-dom";
import Feed from "./Feed";
import WelcomeMessage from "./WelcomeMessage.js"


const Homepage = ({ currentUser }) => {
  if (!currentUser.isAuthenticated) {
    return (
      <div>

        <div class="logged-out-message">
          <h1>Welcome to InnerCircle!</h1>
          <p>Connect with your friends, share posts and photos, send messages, and more.</p>
          <br/>
          <h4>Have an account?</h4>
          <Link to="/signin" className="btn btn-primary sign-up-button">
            Sign In
          </Link>
          <br/>
          <h4>First time? </h4>
          <Link to="/signup" className="btn btn-primary sign-up-button">
            Sign Up
          </Link>
        </div>

      </div>
    );
  }
  return (
    <div>
      {currentUser.user.welcomeMessage ? <WelcomeMessage /> : null}
      <Feed
        profileImageUrl={currentUser.user.profileImageUrl}
        username={currentUser.user.username}
      />
    </div>
  );
};

export default Homepage;
