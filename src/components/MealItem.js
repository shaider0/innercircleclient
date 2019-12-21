import React from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import DefaultProfileImg from "../images/default-profile-image.jpg";
import { withRouter } from "react-router-dom";


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
      <Moment className="text-muted itemDate" format="Do MMM YYYY">
        {date}
      </Moment>
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
      <div>
      {isCorrectUser && (
        <a className="btn btn-danger" onClick={removeMeal}>
          Delete
        </a>
      )}

      {isCorrectUser && (
        <Link to={{
          pathname: `/users/${userId}/meals/${mealId}/update`,
          state: {
            name,
            restaurant,
            imageUrl,
            impressions,
            status,
            userId,
            mealId
          }
        }} className="btn btn-primary">
          Update
        </Link>
      )}

      {isCorrectUser && (
      <Link to={{
        pathname: personalRecommendationUrl,
        state: {
          name,
          restaurant,
          category
        }}}><button className="btn btn-dark">Recommend To A Friend</button>
      </Link>
      )}
      </div>
    </li>
  </div>
);
}

export default withRouter(MealItem);
