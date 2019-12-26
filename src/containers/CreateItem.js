import React, { Component } from "react";
import { connect } from "react-redux";
import MovieForm from "./MovieForm"
import TvshowForm from "./TvshowForm"
import MealForm from "./MealForm"
import RestaurantForm from "./RestaurantForm"
import DestinationForm from "./DestinationForm"
import DiscoveryForm from "./DiscoveryForm"

import { Link } from "react-router-dom"

class CreateItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: "Movie"
    }
  }
  render() {
    let form;
    if (this.state.category === "Movie"){
      form = <MovieForm />
    } else if (this.state.category === "TV Show"){
      form = <TvshowForm />
    } else if (this.state.category === "Restaurant"){
      form = <RestaurantForm />
    } else if (this.state.category === "Meal"){
      form = <MealForm />
    } else if (this.state.category === "Destination"){
      form = <DestinationForm />
    } else if (this.state.category === "Discovery"){
      form = <DiscoveryForm />
    }

    return (
      <div className="createItemForm">
        <p><em>Use this form to share your recommendations and bookmarks with friends</em></p>
        <h5>Choose a Category</h5>
        <select
          className="form-control"
          value={this.state.status}
          onChange={e => this.setState({ category: e.target.value })}>
          <option value="Movie">Movie</option>
          <option value="TV Show">TV Show</option>
          <option value="Restaurant">Restaurant</option>
          <option value="Meal">Meal</option>
          <option value="Destination">Destination</option>
          <option value="Discovery">Discovery</option>
        </select>
        {form}
        <Link className="btn btn-secondary" to="/">Done</Link>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    errors: state.errors
  };
}

export default connect(mapStateToProps, { })(CreateItem);
