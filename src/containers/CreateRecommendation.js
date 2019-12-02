import React, { Component } from "react";
import { connect } from "react-redux";
import MovieForm from "./MovieForm"
import TvshowForm from "./TvshowForm"

class CreateRecommendation extends Component {
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
        <p>Recommend Something</p>
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

export default connect(mapStateToProps, { })(CreateRecommendation);