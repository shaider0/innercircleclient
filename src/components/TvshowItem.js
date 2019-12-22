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
  impressionsjsx = (<p className="impressions"><em>"{impressions}"</em></p>)
}

let personalRecommendationUrl = `/users/${currentUser}/personalRecommendation`
return (
      <li className="list-group-item">
      <div className="feedItem">
        <div className="feedItemMain">
          <i className="fas fa-tv"></i>
          <img
            src={profileImageUrl || DefaultProfileImg}
            alt={username}
            height="100"
            width="100"
            className="timeline-image"
          />
            <Link to="/">@{username} &nbsp;</Link>
            {status === "recommendation"? "recommends the show " : "wants to watch the show "} {title}
            {impressionsjsx}
            {!!availableOn? <p className="availableOn">Available On {availableOn}</p> : null}
        </div>

        <div className="feedItemRight">
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

          <Moment className="text-muted itemDate" format="D MMM YYYY">
            {date}
          </Moment>

        </div>
      </div>
    </li>
);
}

export default TvshowItem;
