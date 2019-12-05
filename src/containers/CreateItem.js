import React, { Component } from "react";
import { connect } from "react-redux";
import MovieForm from "./MovieForm"
import TvshowForm from "./TvshowForm"

class CreateItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: "movie"
    }
  }
  render() {
    let form;
    if (this.state.category === "movie"){
      form = <MovieForm />
    } else if (this.state.category === "tvshow"){
      form = <TvshowForm />
    }
    return (
      <div>
        <h3>Add To Your Lists</h3>
        <h5>Choose a Category</h5>
        <select
          className="form-control"
          value={this.state.status}
          onChange={e => this.setState({ category: e.target.value })}>
          <option value="movie">Movie</option>
          <option value="tvshow">TV Show</option>
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
