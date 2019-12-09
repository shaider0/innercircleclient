import React from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import DefaultProfileImg from "../images/default-profile-image.jpg";
import { withRouter } from "react-router-dom";


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
  isCorrectUser,
  currentUser,
  category
}) => {

let impressionsjsx = null;

if (status === "recommendation" && !!impressions) {
  impressionsjsx = (<p>Impressions: {impressions}</p>)
}
let personalRecommendationUrl = `/users/${currentUser}/personalRecommendation`

return (
  <div>
    <li className="list-group-item">
      <img
        src={profileImageUrl || DefaultProfileImg}
        alt={username}
        height="100"
        width="100"
        className="timeline-image"
      />
      <p className="text-muted">
        <Moment className="text-muted" format="Do MMM YYYY">
          {date}
        </Moment>
      </p>
      {userId === currentUser? <Link to={{
        pathname: personalRecommendationUrl,
        state: {
          title,
          category
        }}}><button>Recommend To A Friend</button></Link> : null }
      <div className="movie-area">
        <Link to="/">@{username} &nbsp;</Link>

        <span>{
          status === "recommendation"? "recommends the movie" : "wants to watch the movie "} {title}
        </span>

        {!!availableOn? <p>Available On: {availableOn}</p> : null}
        {impressionsjsx}
        <div>
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
      </div>
    </li>
  </div>
);
}

export default withRouter(MovieItem);
