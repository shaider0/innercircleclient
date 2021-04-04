import React from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import DefaultProfileImg from "../images/default.png";
import { withRouter } from "react-router-dom";
import DestinationItemMenu from "./DestinationItemMenu"


const DestinationItem = ({
  date,
  city,
  state,
  country,
  imageUrl,
  impressions,
  status,
  destinationId,
  username,
  userId,
  removeDestination,
  updateDestination,
  isCorrectUser,
  currentUser,
  category,
  profileImageUrl
}) => {

  let impressionsjsx = null;

  if (status === "recommendation" && !!impressions) {
    impressionsjsx = (<p><em>"{impressions}"</em></p>)
  }
  let personalRecommendationUrl = `/users/${currentUser}/personalRecommendation`

  return (
    <li>
      <div className="feedItem">
        <div className="feedItemMain">
          <img
            src={profileImageUrl || DefaultProfileImg}
            alt={username}
            height="100"
            width="100"
            className="timeline-image"
          />
          {status === "recommendation" ? <i className="fas fa-heart"></i> : <i className="fas fa-bookmark"></i>}
          <i className="fas fa-plane"></i>

          <span>{username} {
            status === "recommendation" ? "recommends visiting " : "wants to visit "}
            {city} {state} {country}
          </span>
          {impressionsjsx}

          {imageUrl ? <img
            src={imageUrl || "#"}
            alt={username}
            className="destinationImage"
          />
            : null
          }
        </div>

        <div className="feedItemRight">
          <DestinationItemMenu
            removeDestination={removeDestination}
            updateDestination={updateDestination}
            isCorrectUser={isCorrectUser}
            city={city}
            state={state}
            country={country}
            impressions={impressions}
            status={status}
            destinationId={destinationId}
            userId={userId}
            category={category}
            currentUser={currentUser}
            imageUrl={imageUrl}
          />

          <Moment className="text-muted itemDate" format="D MMM YYYY">
            {date}
          </Moment>
        </div>
      </div>
    </li>
  );
}

export default withRouter(DestinationItem);
