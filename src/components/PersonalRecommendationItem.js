import React, { Component } from "react"
import { connect } from "react-redux";
import Moment from "react-moment"
import { Link } from "react-router-dom"
import DefaultProfileImg from "../images/default-profile-image.jpg"
import { withRouter } from "react-router-dom"
import { postNewMovie } from "../store/actions/movies"
import { postNewTvshow } from "../store/actions/tvshows"
import { postNewMeal } from "../store/actions/meals"
import { postNewRestaurant } from "../store/actions/restaurants"
import { postNewDiscovery } from "../store/actions/discoveries"
import { postNewDestination } from "../store/actions/destinations"
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
    const { postNewMovie, postNewTvshow, postNewMeal, postNewRestaurant, postNewDestination, postNewDiscovery, sender, item} = this.props
    const category = item.category

    if (category === "movie") {
      postNewMovie({title: item.title, status: "bookmark" })
    }
    else if (category === "tv show") {
      postNewTvshow({title: item.title, status: "bookmark" })
    }
    else if (category === "meal") {
      postNewMeal({name: item.name, restaurant: item.restaurant, status: "bookmark" })
    }
    else if (category === "restaurant") {
      postNewRestaurant({name: item.name, status: "bookmark" })
    }
    else if (category === "destination") {
      postNewDestination({city: item.city, state: item.state, country: item.country, status: "bookmark" })
    }
    else if (category === "discovery") {
      postNewDiscovery({description: item.description, status: "bookmark" })
    }
    this.handleDelete()
  }

  handleDelete = event => {
    event ? event.preventDefault() : null;
    const { deletePersonalRecommendation, id, currentUser } = this.props
    deletePersonalRecommendation(currentUser, id)
  };

  componentDidMount(){
    const { sender, item, customMessage } = this.props
    const category = item.category
    if (category === "movie") {
      this.setState({
        message: `${sender.username} thinks you'll like the movie ${item.title}`,
        icon: 'fas fa-film',
        customMessage: `${customMessage}`
      })
    }
    if (category === "tv show") {
      this.setState({
        message: `${sender.username} thinks you'll like watching the show ${item.title}`,
        icon: 'fas fa-tv',
        customMessage: `${customMessage}`
      })
    }
    if (category === "meal") {
      this.setState({
        message: `${sender.username} thinks you'll like eating the ${item.name} at ${item.restaurant}`,
        icon: 'fas fa-hamburger',
        customMessage: `${customMessage}`
      })
    }
    if (category === "restaurant") {
      this.setState({
        message: `${sender.username} thinks you'll like eating at the restaurant ${item.name}`,
        icon: 'fas fa-utensils',
        customMessage: `${customMessage}`
      })
    }
    if (category === "destination") {
      this.setState({
        message: `${sender.username} thinks you'll like visiting ${item.city}, ${item.state}, ${item.country}`,
        icon: 'fas fa-plane',
        customMessage: `${customMessage}`
      })
    }
    if (category === "discovery") {
      this.setState({
        message: `${sender.username} thought you'd like to know about a recent discovery:  ${item.description}`,
        icon: 'fas fa-lightbulb',
        customMessage: `${customMessage}`
      })
    }
  }

  render() {
    let message=""
    const { date, sender, item } = this.props
    const category = item.category
    return (
      <div className="personalRecommendationItem">
        <p>
          <Moment className="text-muted" format="D MMM YYYY">
          {date}
          </Moment>
        </p>
        <i className={this.state.icon}></i>
        {sender.profileImageUrl ? <img className="timeline-image" src={sender.profileImageUrl}/> : null}
        <p>{this.state.message}</p>
        {this.state.customMessage ? <p>message: <em>{this.state.customMessage}</em></p> : null}

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

export default connect(mapStateToProps, { deletePersonalRecommendation, postNewMovie, postNewTvshow, postNewMeal, postNewRestaurant, postNewDiscovery, postNewDestination })(PersonalRecommendationItem);
