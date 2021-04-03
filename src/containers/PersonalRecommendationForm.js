
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom"
import { postNewPersonalRecommendation } from "../store/actions/personalRecommendations"

class PersonalRecommendationForm extends Component {
  constructor(props) {
    super(props);
    let { category, title, name, description, movieId, tvshowId, mealId, restaurant, restaurantId, destinationId, city, state, country, discoveryId } = this.props.location.state


    if (category === "movie") {
      this.state = {
        recipientUsername: "",
        customMessage: "",
        title,
        itemId: movieId,
        category,
        model: "Movie"
      }
    }

    if (category === "tv show") {
      this.state = {
        recipientUsername: "",
        customMessage: "",
        title,
        itemId: tvshowId,
        category,
        model: "Tvshow"
      }
    }

    if (category === "meal") {
      this.state = {
        recipientUsername: "",
        customMessage: "",
        name,
        itemId: mealId,
        restaurant,
        category,
        model: "Meal"
      }
    }

    if (category === "restaurant") {
      this.state = {
        recipientUsername: "",
        customMessage: "",
        name,
        itemId: restaurantId,
        category,
        model: "Restaurant"
      }
    }

    if (category === "destination") {
      this.state = {
        recipientUsername: "",
        customMessage: "",
        city,
        state,
        country,
        itemId: destinationId,
        category,
        model: "Destination"
      }
    }

    if (category === "discovery") {
      this.state = {
        recipientUsername: "",
        customMessage: "",
        description,
        itemId: discoveryId,
        category,
        model: "Discovery"
      }
    }
  }

  resetMessage = () => {
    this.setState({
      message: ""
    })
  }

  handleNewPersonalRecommendation = event => {
    event.preventDefault()
    this.props.postNewPersonalRecommendation(this.state)
      .then(res => {
        return res
      })
      .then(res => {
        if(res ==="success") {
          this.setState({
            recipientUsername: "",
            customMessage: "",
            message: "Recommendation Sent!"
        });
      }
        else if(res === "user not found") {
          this.setState({
            recipientUsername: "",
            customMessage: "",
            message: "User not found. Please try again."
        });
      }
        else if(res === "user not a friend") {
          this.setState({
            recipientUsername: "",
            customMessage: "",
            message: 'Please send the user a friend request before trying to send a recommendation.'
          })
        }
    })
    .then(setTimeout(this.resetMessage, 10000))
  }

  render() {
    const { name, title, city, state, country } = this.state
    return (
      <form onSubmit={this.handleNewPersonalRecommendation} className="personalRecommendationForm">
        <p>Recommend {name || title || city || state || country} To A Friend</p>
        <label>To: </label>
        <span>
          <input
            type="text"
            placeholder="Username"
            value={this.state.recipientUsername}
            onChange={e => this.setState({ recipientUsername: e.target.value })}
            className="form-control"
          />
          <input
            type="textarea"
            placeholder="Optional - include a message"
            value={this.state.customMessage}
            onChange={e => this.setState({ customMessage: e.target.value })}
            className="form-control personalRecMessage"
          />
          <button className="btn btn-primary">
            Send
          </button>
          {this.state.message ? <p className="uiMessage">{this.state.message}</p> : null}
        </span>
      </form>
    )
  }
}

function mapStateToProps(state) {
  return {
    errors: state.errors,
    currentUsername: state.currentUser.user.username
  };
}

export default connect(mapStateToProps, { postNewPersonalRecommendation })(PersonalRecommendationForm)
