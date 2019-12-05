import React, { Component } from "react";
import { Redirect } from 'react-router-dom'
import { connect } from "react-redux";
import { updateMovie, postNewMovie } from "../store/actions/movies";


class MovieForm extends Component {
  constructor(props) {
    super(props);
    if(this.props.type === "update") {
      this.state = this.props.state
    } else {
      this.state = {
        title: "",
        availableOn: "",
        impressions: "",
        status: "recommendation",
      }
    }
  }

  handleNewMovie = event => {
    event.preventDefault();

    this.props.postNewMovie(this.state);
    this.setState({
      title: "",
      availableOn: "",
      impressions: "",
      status: "recommendation",
    });
  };

  handleUpdatedMovie = event => {
    event.preventDefault();
    this.props.updateMovie(this.state);
    this.setState({
      title: "",
      availableOn: "",
      impressions: "",
      status: "",
    });
    document.location.href="/"
  };

  render() {
    let handler = this.handleNewMovie
    let buttonText = "Add Movie"
    if(this.props.type === "update") {
      buttonText = "Save Updates"
      handler = this.handleUpdatedMovie
    }
    return (
      <form onSubmit={handler}>
        {this.props.errors.message && (
          <div className="alert alert-danger">{this.props.errors.message}</div>
        )}
        <h5>Choose a Type</h5>
        <select
          className="form-control"
          value={this.state.status}
          onChange={e => this.setState({ status: e.target.value })}
        >
          <option value="recommendation">Something I'd Recommend</option>
          <option value="want to watch">Something I Want To Watch</option>
        </select>
        <h5>Record Movie Information</h5>
        <input
          required
          type="text"
          placeholder="*Title"
          className="form-control"
          value={this.state.title}
          onChange={e => this.setState({ title: e.target.value })}
        />
        {this.state.status === "recommendation" ?
          <div>
            <input
              type="text"
              placeholder="Your Impressions (120 characters max)"
              className="form-control"
              value={this.state.impressions}
              onChange={e => this.setState({ impressions: e.target.value })}
            />
          </div>
          : null
        }
        <input
          placeholder="Where It's Available (e.g., Netflix, Hulu, Amazon Prime Video, etc.)"
          type="text"
          list="availableOn"
          className="form-control"
          value={this.state.availableOn}
          onChange={e => this.setState({ availableOn: e.target.value })}
        />

        <datalist id="availableOn">
          <option value="Amazon Prime Video"/>
          <option value="Cinemax"/>
          <option value="Disney Plus"/>
          <option value="HBO"/>
          <option value="Hulu"/>
          <option value="Movie Theater"/>
          <option value="Netflix"/>
          <option value="Showtime"/>
          <option value="Starz"/>
        </datalist>
        <button type="submit" className="btn btn-primary">
          {buttonText}
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

export default connect(mapStateToProps, { postNewMovie, updateMovie })(MovieForm);
