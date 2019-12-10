import React from "react";
import RecommendationsFeedList from "../containers/RecommendationsFeedList";

const RecommendationsFeed = props => {
  return (
    <div className="recommendationsFeed">
      <h1>Timeline</h1>
        <RecommendationsFeedList />
    </div>
  );
};

export default RecommendationsFeed;
