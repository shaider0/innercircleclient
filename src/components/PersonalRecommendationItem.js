import React, { Component } from "react"
import { connect } from "react-redux";
import Moment from "react-moment"
import { Link } from "react-router-dom"
import DefaultProfileImg from "../images/default-profile-image.jpg"
import { withRouter } from "react-router-dom"
import { postNewMovie } from "../store/actions/movies"
import { postNewTvshow } from "../store/actions/tvshows"

class PersonalRecommendationItem extends Component {
  constructor(props) {
    super(props)
    }

  handleAddToWatchList = event => {
    event.preventDefault()
    const { postNewMovie, postNewTvshow, sender, item, category } = this.props
    if (category === "movie") {
      postNewMovie({title: item, status: "bookmark" })
    }
    else if (category === "tv show") {
      postNewTvshow({title: item, status: "bookmark" })
    }
  };

  render() {
    console.log(this.props)
    const { date, sender, item, category } = this.props
    return (
      <div>
        <span><Moment className="text-muted" format="Do MMM YYYY">
        {date}
        </Moment></span>
        <span> @<Link to='#'>{sender}</Link> thinks you'll like the {category} {item}</span>
        <p>
        <button onClick={this.handleAddToWatchList}>Add To My Bookmarks</button>
        <button>Ignore</button>
        </p>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    errors: state.errors
  };
}

export default connect(mapStateToProps, { postNewMovie, postNewTvshow })(PersonalRecommendationItem);