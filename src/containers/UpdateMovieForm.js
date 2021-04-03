import React, { Component } from "react";
import { connect } from "react-redux";
import { updateMovie } from "../store/actions/movies";
import MovieForm from "./MovieForm"

class UpdateMovieForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.location.state.title,
      availableOn: this.props.location.state.availableOn,
      impressions: this.props.location.state.impressions,
      status: this.props.location.state.status,
      userId: this.props.location.state.userId,
      movieId: this.props.location.state.movieId
    };
  }

  render() {
    return (
      <div className="update-form">
      <h3>Update Item</h3>
      <MovieForm
        type="update" state={this.state}
      />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    errors: state.errors
  };
}

export default connect(mapStateToProps, { updateMovie })(UpdateMovieForm);
