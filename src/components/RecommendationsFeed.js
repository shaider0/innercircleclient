import React from "react";
import RecommendationsFeedList from "../containers/RecommendationsFeedList";

const RecommendationsFeed = props => {
  return (
    <div className="recommendationsFeed">
      <h1>Timeline</h1>
      <p>View recommendations and bookmarks added by you and your friends</p>
      <RecommendationsFeedList />
    </div>
  );
};

export default RecommendationsFeed;
