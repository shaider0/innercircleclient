import React from "react";
import TvshowList from "../containers/TvshowList";
import UserAside from "./UserAside";

const TvshowTimeline = props => {
  return (
    <div className="row">
      <UserAside
        profileImageUrl={props.profileImageUrl}
        username={props.username}
      />
      <TvshowList />
    </div>
  );
};

export default TvshowTimeline;
