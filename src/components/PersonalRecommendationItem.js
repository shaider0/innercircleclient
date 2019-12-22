import React, { Component } from "react"
import { connect } from "react-redux";
import Moment from "react-moment"
import { Link } from "react-router-dom"
import DefaultProfileImg from "../images/default-profile-image.jpg"
import { withRouter } from "react-router-dom"
import { postNewMovie } from "../store/actions/movies"
import { postNewTvshow } from "../store/actions/tvshows"
import { postNewMeal } from "../store/actions/meals"
import { deletePersonalRecommendation } from "../store/actions/personalRecommendations"

class PersonalRecommendationItem extends Component {
  constructor(props) {
    super(props)
    }

  handleAddToWatchList = event => {
    event.preventDefault()
    const { postNewMovie, postNewTvshow, postNewMeal, sender, item, category } = this.props
    if (category === "movie") {
      postNewMovie({title: item, status: "bookmark" })
    }
    else if (category === "tv show") {
      postNewTvshow({title: item, status: "bookmark" })
    }
    else if (category === "meal") {
      postNewMeal({name: item, status: "bookmark" })
    }
  };

  handleDelete = event => {
    event.preventDefault()
    const { deletePersonalRecommendation, id, currentUser } = this.props
    deletePersonalRecommendation(currentUser, id)
  };

  render() {
    const { date, sender, item, category } = this.props
    console.log('sender is', sender)
    return (
      <div className="personalRecommendationItem">
        <p>
          <Moment className="text-muted" format="D MMM YYYY">
          {date}
          </Moment>
        </p>
        <p>@<Link to='#'>{sender}</Link> thinks you'll like the {category} {item}</p>
        <p>
          <button className="btn btn-primary" onClick={this.handleAddToWatchList}>Add To My Bookmarks</button>
          <button className="btn btn-danger" onClick={this.handleDelete}>Ignore</button>
        </p>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    errors: state.errors,
    currentUser: state.currentUser.user.id
  };
}

export default connect(mapStateToProps, { deletePersonalRecommendation, postNewMovie, postNewTvshow, postNewMeal })(PersonalRecommendationItem);
