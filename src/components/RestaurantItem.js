import React from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import DefaultProfileImg from "../images/default.png";
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
            <i className="fas fa-utensils"></i>
          </div>
          <div className="col-xs-4">
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
          </div>
        </div>

        <div className="date">
          <Moment className="text-muted itemDate" format="D MMM YYYY">
            {date}
          </Moment>
        </div>

        <span>{username} {
          status === "recommendation" ? "recommends eating at the " : "wants to try the "} restaurant {name}
        </span>
        {impressionsjsx}

        {imageUrl ? <img
          src={imageUrl || "#"}
          alt={username}
          className="restaurantImage"
        />
          : null
        }
      </div>
    </li >
  );
}

export default withRouter(RestaurantItem);
