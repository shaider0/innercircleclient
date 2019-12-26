import React from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import DefaultProfileImg from "../images/default-profile-image.jpg";
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
  <li className="list-group-item">
  <div className="feedItem">
    <div className="feedItemMain">
      {status==="recommendation" ? <i className="fas fa-heart"></i> : <i className="fas fa-bookmark"></i> }
      <i className="fas fa-lightbulb"></i>
      {title}
      {description}
      <img
        src={profileImageUrl || DefaultProfileImg}
        alt={username}
        height="100"
        width="100"
        className="timeline-image"
      />

      <span>{username}
      </span>

      {imageUrl ?  <img
        src={imageUrl || "#"}
        alt={username}
        className="discoveryImage"
      />
      : null
      }
    </div>

    <div className="feedItemRight">
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

      <Moment className="text-muted itemDate" format="D MMM YYYY">
        {date}
      </Moment>
    </div>
  </div>
  </li>
);
}

export default withRouter(DiscoveryItem);
