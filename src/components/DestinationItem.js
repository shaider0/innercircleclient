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
            <i className="fas fa-plane"></i>
          </div>

          <div className="col-xs-4">
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
          </div>
        </div>
        <div className="date">
          <Moment className="text-muted" format="D MMM YYYY">
            {date}
          </Moment>
        </div>

        {username} {
          status === "recommendation" ? "recommends visiting " : "wants to visit "}
        {city} {state} {country}
        {impressionsjsx}

        {imageUrl ? <img
          src={imageUrl || "#"}
          alt={username}
          className="destinationImage"
        />
          : null
        }
      </div>
    </li >
  );
}

export default withRouter(DestinationItem);
