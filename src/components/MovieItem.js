import React from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import DefaultProfileImg from "../images/default-profile-image.jpg";

const MovieItem = ({
  date,
  profileImageUrl,
  title,
  availableOn,
  impressions,
  status,
  movieId,
  username,
  userId,
  removeMovie,
  updateMovie,
  isCorrectUser
}) => (
  <div>
    <li className="list-group-item">
      <img
        src={profileImageUrl || DefaultProfileImg}
        alt={username}
        height="100"
        width="100"
        className="timeline-image"
      />
      <div className="movie-area">
        <Link to="/">@{username} &nbsp;</Link>
        <span className="text-muted">
          <Moment className="text-muted" format="Do MMM YYYY">
            {date}
          </Moment>
        </span>
        <p>Movie: {title}</p>
        <p>Available On: {availableOn}</p>
        <p>Impressions: {impressions}</p>
        <p>Status: {status}</p>
        {isCorrectUser && (
          <a className="btn btn-danger" onClick={removeMovie}>
            Delete
          </a>
        )}
        {isCorrectUser && (
          <Link to={{
            pathname: `/users/${userId}/movies/${movieId}/update`,
            state: {
              title,
              availableOn,
              impressions,
              status,
              userId,
              movieId
            }
          }} className="btn btn-primary">
            Update
          </Link>
        )}
      </div>
    </li>
  </div>
);

export default MovieItem;
