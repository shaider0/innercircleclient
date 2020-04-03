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
  <li>
  <div className="feedItem">
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
    <div>
      <div className="post-header">
        <span className="recbookicon">{status==="recommendation" ? <i className="fas fa-heart"></i> : <i className="fas fa-bookmark"></i> }</span>
        <span className="caticon"><i className=" fas fa-hamburger"></i></span>
        <img
          src={profileImageUrl || DefaultProfileImg}
          alt={username}
          height="100"
          width="100"
          className="timeline-image"
        />
      </div>
      <div class="post-title">{username} {
        status === "recommendation"? "recommends trying the " : "wants to try the "} {name}
      </div>
      <span> at {restaurant}</span>
      <div>{impressionsjsx}</div>

      <div>{imageUrl ?  <img
        src={imageUrl || "#"}
        alt={username}
        className="mealImage"
      />
      : null
      }
      </div>
    </div>

    <div>
      <Moment className="text-muted itemDate" format="D MMM YYYY">
        {date}
      </Moment>
    </div>
  </div>
  </li>
);
}

export default withRouter(MealItem);
