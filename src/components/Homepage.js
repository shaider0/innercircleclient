import React from "react";
import { Link } from "react-router-dom";
import RecommendationsFeed from "./RecommendationsFeed";
import UserAside from "./UserAside";
import CreateRecommendation from "../containers/CreateRecommendation"

const Homepage = ({ currentUser }) => {
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
      <UserAside
        profileImageUrl={currentUser.user.profileImageUrl}
        username={currentUser.user.username}
      />
      <CreateRecommendation />
      <RecommendationsFeed
        profileImageUrl={currentUser.user.profileImageUrl}
        username={currentUser.user.username}
      />
    </div>
  );
};

export default Homepage;
