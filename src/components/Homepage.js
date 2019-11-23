import React from "react";
import { Link } from "react-router-dom";
import MovieTimeline from "./MovieTimeline";
import TvshowTimeline from "./TvshowTimeline";
import FeedTimeline from "./FeedTimeline";
import UserAside from "./UserAside";

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
      <FeedTimeline
        profileImageUrl={currentUser.user.profileImageUrl}
        username={currentUser.user.username}
      />
    </div>
  );
};

export default Homepage;
