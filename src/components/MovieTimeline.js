import React from "react";
import MovieList from "../containers/MovieList";
import UserAside from "./UserAside";

const MovieTimeline = props => {
  return (
    <div className="row">
      <UserAside
        profileImageUrl={props.profileImageUrl}
        username={props.username}
      />
      <MovieList />
    </div>
  );
};

export default MovieTimeline;
