import React, { Component } from "react";
import { connect } from "react-redux";
import { postNewMovie } from "../store/actions/movies";

class MovieForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: ""
    };
  }

  handleNewMovie = event => {
    event.preventDefault();
    this.props.postNewMovie(this.state.movie);
    this.setState({ movie: "" });
    this.props.history.push("/");
  };

  render() {
    return (
      <form onSubmit={this.handleNewMovie}>
        {this.props.errors.movie && (
          <div className="alert alert-danger">{this.props.errors.movie}</div>
        )}
        <input
          type="text"
          className="form-control"
          value={this.state.movie}
          onChange={e => this.setState({ movie: e.target.value })}
        />
        <button type="submit" className="btn btn-success">
          Add a new Movie!
        </button>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    errors: state.errors
  };
}

export default connect(mapStateToProps, { postNewMovie })(MovieForm);
