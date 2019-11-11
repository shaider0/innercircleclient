import React, { Component } from "react";
import { connect } from "react-redux";
import { postNewMovie } from "../store/actions/movies";

class MovieForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      availableOn: "",
      impressions: "",
      status: "",
    };
  }

  handleNewMovie = event => {
    event.preventDefault();

    const newMovie = {
      title: this.state.title,
      availableOn: this.state.availableOn,
      impressions: this.state.impressions,
      status: this.state.status,
    }

    this.props.postNewMovie(newMovie);
    this.setState({ 
      title: "",
      availableOn: "",
      impressions: "",
      status: "",
    });
    console.log(newMovie);

    this.props.history.push("/");
  };

  render() {
    return (
      <form onSubmit={this.handleNewMovie}>
        {this.props.errors.message && (
          <div className="alert alert-danger">{this.props.errors.message}</div>
        )}
        <label>Movie Title</label>
        <input
          type="text"
          className="form-control"
          value={this.state.title}
          onChange={e => this.setState({ title: e.target.value })}
        />
        <label>Where is it available?</label>
        <input
          type="text"
          className="form-control"
          value={this.state.availableOn}
          onChange={e => this.setState({ availableOn: e.target.value })}
        />
        <label>What did you think about it?</label>
        <input
          type="text"
          className="form-control"
          value={this.state.impressions}
          onChange={e => this.setState({ impressions: e.target.value })}
        />
        <label>Status</label>
        <input
          type="text"
          className="form-control"
          value={this.state.status}
          onChange={e => this.setState({ status: e.target.value })}
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
