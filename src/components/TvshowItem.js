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
  <div className="feedItem">
    <li className="list-group-item">
      <Moment className="text-muted itemDate" format="Do MMM YYYY">
        {date}
      </Moment>
      <img
        src={profileImageUrl || DefaultProfileImg}
        alt={username}
        height="100"
        width="100"
        className="timeline-image"
      />
        <Link to="/">@{username} &nbsp;</Link>
        {status === "recommendation"? "recommends the show " : "wants to watch the show "} {title}
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
              tvshowId
            }
          }} className="btn btn-primary">
            Update
          </Link>
        )}

        {userId === currentUser? <Link to={{
          pathname: personalRecommendationUrl,
          state: {
            title,
            category
          }}}><button className="btn btn-dark">Send A Personal Recommendation</button></Link> : null }
        </div>
    </li>
  </div>
);
}

export default TvshowItem;
