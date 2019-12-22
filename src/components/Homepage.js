import React from "react";
import { Link } from "react-router-dom";
import RecommendationsFeed from "./RecommendationsFeed";
import UserAside from "./UserAside";
import CreateItem from "../containers/CreateItem"
import WelcomeMessage from "./WelcomeMessage.js"


const Homepage = ({ currentUser }) => {
  console.log('curr user ', currentUser)
  if (!currentUser.isAuthenticated) {
    return (
      <div className="home-hero">
        <h1>What's Happening?</h1>
        <h4>New to Inner Circle?</h4>
        <Link to="/signup" className="btn btn-primary">
          Sign up here
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
