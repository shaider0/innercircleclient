import React from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import DefaultProfileImg from "../images/default-profile-image.jpg";
import { withRouter } from "react-router-dom";
import MovieItemMenu from "./MovieItemMenu"


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
  impressionsjsx = (<p><em>"{impressions}"</em></p>)
}

return (
    <li className="list-group-item">

    <div className="feedItem">
      <div className="feedItemMain">
        <i class="fas fa-film"></i>
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
      </div>

      <div className="feedItemRight">
        <MovieItemMenu
        removeMovie={removeMovie}
        updateMovie={updateMovie}
        isCorrectUser={isCorrectUser}
        title={title}
        availableOn={availableOn}
        impressions={impressions}
        status={status}
        movieId={movieId}
        userId={userId}
        category={category}
        currentUser={currentUser}
        />
        <Moment className="text-muted itemDate" format="D MMM YYYY">
          {date}
        </Moment>
      </div>
      
    </div>
    </li>
)
}

export default withRouter(MovieItem);
