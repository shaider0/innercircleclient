import React from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import DefaultProfileImg from "../images/default-profile-image.jpg";
import { withRouter } from "react-router-dom";


const MovieItem = ({
  date,
  profileImageUrl,
  title,
  availableOn,
  impressions,
  status,
  movieId,
  username,
  userId,
  removeMovie,
  updateMovie,
  isCorrectUser,
  currentUser,
  category
}) => {

let impressionsjsx = null;

if (status === "recommendation" && !!impressions) {
  impressionsjsx = (<p>Impressions: {impressions}</p>)
}
let personalRecommendationUrl = `/users/${currentUser}/personalRecommendation`
console.log('user', isCorrectUser)

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
        status === "recommendation"? "recommends the movie" : "wants to watch the movie "} {title}
      </span>
      {!!availableOn? <p>Available On: {availableOn}</p> : null}
      {impressionsjsx}
      <div>
      {isCorrectUser && (
        <a className="btn btn-danger" onClick={removeMovie}>
          Delete
        </a>
      )}
      {isCorrectUser && (
        <Link to={{
          pathname: `/users/${userId}/movies/${movieId}/update`,
          state: {
            title,
            availableOn,
            impressions,
            status,
            userId,
            movieId
          }
        }} className="btn btn-primary">
          Update
        </Link>
      )}
      {userId === currentUser? <Link to={{
        pathname: personalRecommendationUrl,
        state: {
          title,
          category
        }}}><button className="btn btn-dark">Send A Personal Recommendation</button></Link> : null }
      </div>
    </li>
  </div>
);
}

export default withRouter(MovieItem);
