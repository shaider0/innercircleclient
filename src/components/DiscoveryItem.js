import React from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import DefaultProfileImg from "../images/default.png";
import { withRouter } from "react-router-dom";
import DiscoveryItemMenu from "./DiscoveryItemMenu"


const DiscoveryItem = ({
  date,
  title,
  description,
  imageUrl,
  status,
  discoveryId,
  username,
  userId,
  removeDiscovery,
  updateDiscovery,
  isCorrectUser,
  currentUser,
  category,
  profileImageUrl
}) => {

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
            <i className="fas fa-lightbulb"></i>
          </div>
          <div className="col-xs-4">
            <DiscoveryItemMenu
              removeDiscovery={removeDiscovery}
              updateDiscovery={updateDiscovery}
              isCorrectUser={isCorrectUser}
              title={title}
              description={description}
              status={status}
              discoveryId={discoveryId}
              userId={userId}
              category={category}
              currentUser={currentUser}
              imageUrl={imageUrl}
            />
          </div>
        </div>
        <div className="date">
          <Moment className="text-muted itemDate" format="D MMM YYYY">
            {date}
          </Moment>
        </div>
        <span>{username} recently discovered:
      </span>
        {description}
        {imageUrl ? <img
          src={imageUrl || "#"}
          alt={username}
          className="discoveryImage"
        />
          : null
        }
      </div>
    </li >
  );
}

export default withRouter(DiscoveryItem);
