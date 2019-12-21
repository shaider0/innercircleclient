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
  impressionsjsx = (<p>Impressions: {impressions}</p>)
}
let personalRecommendationUrl = `/users/${currentUser}/personalRecommendation`

return (
  <div className="feedItem">
    <li className="list-group-item">
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
      <Moment className="text-muted itemDate" format="Do MMM YYYY">
        {date}
      </Moment>
    </li>
  </div>
);
}

export default withRouter(MealItem);
