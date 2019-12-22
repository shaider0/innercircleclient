import React from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import DefaultProfileImg from "../images/default-profile-image.jpg";
import { withRouter } from "react-router-dom";
import MealItemMenu from "./MealItemMenu"


const MealItem = ({
  date,
  name,
  restaurant,
  imageUrl,
  impressions,
  status,
  mealId,
  username,
  userId,
  removeMeal,
  updateMeal,
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
      <i className="fas fa-hamburger"></i>
      <img
        src={profileImageUrl || DefaultProfileImg}
        alt={username}
        height="100"
        width="100"
        className="timeline-image"
      />

      <Link to="/">@{username} &nbsp;</Link>
      <span>{
        status === "recommendation"? "recommends the " : "wants to try the "} {name}
      </span>
      <span> at {restaurant}</span>
      {impressionsjsx}

      {imageUrl ?  <img
        src={imageUrl || "#"}
        alt={username}
        className="mealImage"
      />
      : null
      }
    </div>

    <div className="feedItemRight">
      <MealItemMenu
      removeMeal={removeMeal}
      updateMeal={updateMeal}
      isCorrectUser={isCorrectUser}
      name={name}
      restaurant={restaurant}
      impressions={impressions}
      status={status}
      mealId={mealId}
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

export default withRouter(MealItem);
