import React from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import DefaultProfileImg from "../images/default.png";
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
    <li>
      <div className="container post">

        <div className="row top">
          <div className="col-xs-4">
            <img
              src={profileImageUrl || DefaultProfileImg}
              alt={username}
              height="100"
              width="100"
              className="timeline-image"
            />
          </div>
          <div className="col-xs-4 top-middle">
            {status === "recommendation" ? <i className="fas fa-heart"></i> : <i className="fas fa-bookmark"></i>}
            <i className="fas fa-tv"></i>
          </div>
          <div className="col-xs-4">
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
          </div>
        </div>
        <div className="row date">
          <div>
            <Moment className="text-muted itemDate" format="D MMM YYYY">
              {date}
            </Moment>
          </div>
        </div>

        {username} {
          status === "recommendation" ? "recommends watching the show" : "wants to watch the movie "} {title}
        {impressionsjsx}
        {!!availableOn ? <p className="availableOn">Available On {availableOn}</p> : null}

      </div>
    </li >
  );
}

export default TvshowItem;
