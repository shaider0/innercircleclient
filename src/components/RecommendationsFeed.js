import React from "react";
import RecommendationsFeedList from "../containers/RecommendationsFeedList";

const RecommendationsFeed = props => {
  return (
    <div>
      <h3>Timeline of Recommendations and Bookmarks</h3>
        <RecommendationsFeedList />
    </div>
  );
};

export default RecommendationsFeed;
