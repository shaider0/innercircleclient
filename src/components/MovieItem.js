import React, { Component } from "react";
import Moment from "react-moment";
import { connect } from "react-redux"
import { Link } from "react-router-dom";
import DefaultProfileImg from "../images/default.png";
import { withRouter } from "react-router-dom";
import MovieItemMenu from "./MovieItemMenu"
import { likeMovie } from "../store/actions/movies"


class MovieItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  toggleLike = event => {
    event.preventDefault()
    this.props.likeMovie(this.props.currentUser, event.target.id)
  }

  render() {
    const {
      movie,
      date,
      profileImageUrl,
      title,
      availableOn,
      impressions,
      status,
      movieId,
      likedBy,
      username,
      userId,
      removeMovie,
      updateMovie,
      isCorrectUser,
      currentUser,
      category } = this.props

    let impressionsjsx = null;

    if (status === "recommendation" && !!impressions) {
      impressionsjsx = (<p><em>"{impressions}"</em></p>)
    }

    let likedByList = null
    if (likedBy.length > 0) {
      likedByList = likedBy.map(user => {
        return <p>{user.username}</p>
      })
    }

    let likeCount = likedBy.length

    let likedStatus = !!likedBy.filter(user => user._id === currentUser).length

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
              <i className="fas fa-film"></i>
            </div>
            <div className="col-xs-4">
              <MovieItemMenu
                movie={movie}
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
            </div>
          </div>
          <div className="date">
            <Moment className="text-muted" format="D MMM YYYY">
              {date}
            </Moment>
          </div>

          {username} {
            status === "recommendation" ? "recommends watching the movie" : "wants to watch the movie "} {title}
          {!!availableOn ? <p>Available On: {availableOn}</p> : null}
          {impressionsjsx}
          <div className="likeCount">
            <i id={movieId} className={"fas fa-hands-helping " + (likedStatus ? "liked" : null)} onClick={this.toggleLike}></i>
            {likeCount > 0 ? likeCount : null}
          </div>
        </div>
      </li>
    )
  }
}

function mapStateToProps(state) {
  return {
    errors: state.errors
  };
}

export default withRouter(connect(mapStateToProps, { likeMovie })(MovieItem))
