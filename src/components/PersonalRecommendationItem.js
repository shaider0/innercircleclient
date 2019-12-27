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
      this.state = {
        message: "",
        icon: ""
      }
    }

  handleAddToWatchList = event => {
    event.preventDefault()
    const { postNewMovie, postNewTvshow, postNewMeal, sender, item, category } = this.props

    if (category === "Movie") {
      postNewMovie({title: item.title, status: "bookmark" })
    }
    else if (category === "Tv show") {
      postNewTvshow({title: item.title, status: "bookmark" })
    }
    else if (category === "Meal") {
      postNewMeal({name: item.name, restaurant: item.restaurant, status: "bookmark" })
    }
    else if (category === "Restaurant") {
      postNewMeal({name: item.name, status: "bookmark" })
    }
    else if (category === "Destination") {
      postNewMeal({city: item.city, state: item.state, country: item.country, status: "bookmark" })
    }
    else if (category === "Discovery") {
      postNewMeal({description: item.description, status: "bookmark" })
    }
    this.handleDelete()
  }

  handleDelete = event => {
    event ? event.preventDefault() : null;
    const { deletePersonalRecommendation, id, currentUser } = this.props
    deletePersonalRecommendation(currentUser, id)
  };

  componentDidMount(){
    const { sender, item, category } = this.props
    if (category === "Movie") {
      this.setState({
        message: `${sender.username} thinks you'll like the movie ${item.title}`,
        icon: 'fas fa-film'
      })
    }
    if (category === "Tv show") {
      this.setState({
        message: `${sender.username} thinks you'll like watching the show ${item.title}`,
        icon: 'fas fa-fv'
      })
    }
    if (category === "Meal") {
      this.setState({
        message: `${sender.username} thinks you'll like watching the ${item.name} at ${item.restaurant}`,
        icon: 'fas fa-hamburger'
      })
    }
    if (category === "Restaurant") {
      this.setState({
        message: `${sender.username} thinks you'll like eating the ${item.name} at ${item.restaurant}`,
        icon: 'fas fa-utensils'
      })
    }
    if (category === "Destination") {
      this.setState({
        message: `${sender.username} thinks you'll like visiting ${item.city}, ${item.state}, ${item.country}`,
        icon: 'fas fa-plane'
      })
    }
    if (category === "Discovery") {
      this.setState({
        message: `${sender.username} thought you'd like to know about a recent discovery:  ${item.description}`,
        icon: 'fas fa-lightbulb'
      })
    }
  }

  render() {
    let message=""
    const { date, sender, item} = this.props
    const category = item.category
    console.log('sender is', sender)
    return (
      <div className="personalRecommendationItem">
        <p>
          <Moment className="text-muted" format="D MMM YYYY">
          {date}
          </Moment>
        </p>
        {sender.profileImageUrl ? <img className="timeline-image" src={sender.profileImageUrl}/> : null}
        <p><i className={this.state.icon}></i></p>
        <p>{this.state.message}</p>
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
