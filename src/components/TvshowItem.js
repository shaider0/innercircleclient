import React from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import DefaultProfileImg from "../images/default-profile-image.jpg";

const TvshowItem = ({
  date,
  profileImageUrl,
  title,
  availableOn,
  impressions,
  status,
  tvshowId,
  username,
  userId,
  removeTvshow,
  updateTvshow,
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
          title
        }}}><button>Tell A Friend</button></Link> : null }

      <div className="tvshow-area">
        <Link to="/">@{username} &nbsp;</Link>
        <p>{
          status === "recommendation"? "recommends the show " : "wants to watch the show "} {title}
        </p>

        {!!availableOn? <p>Available On: {availableOn}</p> : null}
        {impressionsjsx}
        <div>
        {isCorrectUser && (
          <a className="btn btn-danger" onClick={removeTvshow}>
            Delete
          </a>
        )}
        {isCorrectUser && (
          <Link to={{
            pathname: `/users/${userId}/tvshows/${tvshowId}/update`,
            state: {
              title,
              availableOn,
              impressions,
              status,
              userId,
              tvshowId,
              category
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

export default TvshowItem;
