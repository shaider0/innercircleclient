import React from "react";
import { Link } from "react-router-dom";
import RecommendationsFeed from "./RecommendationsFeed";
import WelcomeMessage from "./WelcomeMessage.js"


const Homepage = ({ currentUser }) => {
  if (!currentUser.isAuthenticated) {
    return (
      <div className="home-hero">
        <h1>Welcome to InnerCircle</h1>
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
    );
  }
  return (
    <div>
      {currentUser.user.welcomeMessage ? <WelcomeMessage /> : null}
      <RecommendationsFeed
        profileImageUrl={currentUser.user.profileImageUrl}
        username={currentUser.user.username}
      />
    </div>
  );
};

export default Homepage;
