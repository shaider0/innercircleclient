import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom"
import { postNewPersonalRecommendation } from "../store/actions/personalRecommendations"

class PersonalRecommendationForm extends Component {
  constructor(props) {
    super(props);
    let { category, title, name, description, movieId, tvshowId, mealId, restaurant, restaurantId, destinationId, city, state, country, discoveryId } = this.props.location.state
    category = category.charAt(0).toUpperCase() + category.substring(1)
    console.log('cat is', category)

    if (category === "Movie") {
      this.state = {
        recipientUsername: "",
        description: title,
        item: movieId,
        category
      }
    }

    if (category === "Tv show") {
      let categoryWithoutSpace = "Tvshow"
      this.state = {
        recipientUsername: "",
        description: title,
        item: tvshowId,
        category: categoryWithoutSpace
      }
    }

    if (category === "Meal") {
      this.state = {
        recipientUsername: "",
        description: `${name} at ${restaurant}`,
        item: mealId,
        category
      }
    }

    if (category === "Restaurant") {
      this.state = {
        recipientUsername: "",
        description: name,
        item: restaurantId,
        category
      }
    }

    if (category === "Destination") {
      this.state = {
        recipientUsername: "",
        description: `${city} ${state} ${country}`,
        item: destinationId,
        category
      }
    }

    if (category === "Discovery") {
      this.state = {
        recipientUsername: "",
        description,
        item: discoveryId,
        category
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
        if(res ==="success") {
          this.setState({
            username: "",
            message: "Recommendation Sent!"
        });
      }
    })
    .then(setTimeout(this.resetMessage, 2200))
  }

  render() {
    return (
      <div>
      <form onSubmit={this.handleNewPersonalRecommendation}>
        <h3>Send a Personal Recommendation To A Friend</h3>
        <label>To: </label>
        <span>
          <input
            type="text"
            placeholder="username"
            value={this.state.recipientUsername}
            onChange={e => this.setState({ recipientUsername: e.target.value })}
            className="form-control"
          />
          <label>Recommendation: </label>
          <p>{this.state.category}:   {this.state.description}</p>
          <button>
            Send
          </button>
          {this.state.message ? <p className="successMessage">{this.state.message}</p> : null}
        </span>
      </form>
      <Link className="btn btn-secondary" to="/">Return to Homepage</Link>
      </div>
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
