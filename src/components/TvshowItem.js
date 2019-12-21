import React from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import DefaultProfileImg from "../images/default-profile-image.jpg";
import TvshowItemMenu from "./TvshowItemMenu"

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
    <TvshowItemMenu
    removeTvshow={removeTvshow}
    updateTvshow={updateTvshow}
    isCorrectUser={isCorrectUser}
    title={title}
    availableOn={availableOn}
    impressions={impressions}
    status={status}
    tvshowId={tvshowId}
    userId={userId}
    category={category}
    currentUser={currentUser}
    />
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
    </li>
  </div>
);
}

export default TvshowItem;
