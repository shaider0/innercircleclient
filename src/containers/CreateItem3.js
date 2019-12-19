import React, { Component } from "react";
import { connect } from "react-redux";
import MovieForm from "./MovieForm"
import TvshowForm from "./TvshowForm"
import MealForm from "./MealForm"

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
    } else if (this.state.category === "Meal"){
      form = <MealForm />
    }
    return (
      <div className="createItemForm">
        <h3>Make A Recommendation</h3>
        <p>Use this form to add recommendations (things you like) and bookmarks (things you want to try)</p>
        <h5>Choose a Category</h5>
        <select
          className="form-control"
          value={this.state.status}
          onChange={e => this.setState({ category: e.target.value })}>
          <option value="Movie">Movie</option>
          <option value="TV Show">TV Show</option>
          <option value="Meal">Meal</option>
        </select>
        {form}
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
