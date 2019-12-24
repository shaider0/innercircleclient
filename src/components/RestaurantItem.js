import React from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import DefaultProfileImg from "../images/default-profile-image.jpg";
import { withRouter } from "react-router-dom";
import RestaurantItemMenu from "./RestaurantItemMenu"


const RestaurantItem = ({
  date,
  name,
  imageUrl,
  impressions,
  status,
  restaurantId,
  username,
  userId,
  removeRestaurant,
  updateRestaurant,
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
  <li className="list-group-item">
  <div className="feedItem">
    <div className="feedItemMain">
      {status==="recommendation" ? <i className="fas fa-heart"></i> : <i className="fas fa-bookmark"></i> }
      <i className="fas fa-utensils"></i>
      <img
        src={profileImageUrl || DefaultProfileImg}
        alt={username}
        height="100"
        width="100"
        className="timeline-image"
      />

      <span>{username} {
        status === "recommendation"? "recommends the " : "wants to try the "} restaurant {name}
      </span>
      {impressionsjsx}

      {imageUrl ?  <img
        src={imageUrl || "#"}
        alt={username}
        className="restaurantImage"
      />
      : null
      }
    </div>

    <div className="feedItemRight">
      <RestaurantItemMenu
      removeRestaurant={removeRestaurant}
      updateRestaurant={updateRestaurant}
      isCorrectUser={isCorrectUser}
      name={name}
      impressions={impressions}
      status={status}
      restaurantId={restaurantId}
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

export default withRouter(RestaurantItem);
