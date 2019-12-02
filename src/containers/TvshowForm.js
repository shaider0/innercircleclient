import React, { Component } from "react";
import { connect } from "react-redux";
import { postNewTvshow } from "../store/actions/tvshows";

class TvshowForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      availableOn: "",
      impressions: "",
      status: "recommendation",
    }
  }

  handleNewTvshow = event => {
    event.preventDefault();

    this.props.postNewTvshow(this.state);
    this.setState({
      title: "",
      availableOn: "",
      impressions: "",
      status: "recommendation",
    });
  };

  render() {
    return (
      <form onSubmit={this.handleNewTvshow}>
        {this.props.errors.message && (
          <div className="alert alert-danger">{this.props.errors.message}</div>
        )}
        <input
          type="text"
          placeholder="TV Show Title"
          className="form-control"
          value={this.state.title}
          onChange={e => this.setState({ title: e.target.value })}
        />

        <input
          placeholder="Platform/Network (e.g., Netflix, Hulu, Amazon Prime Video, etc.)"
          type="text"
          list="availableOn"
          className="form-control"
          value={this.state.availableOn}
          onChange={e => this.setState({ availableOn: e.target.value })}
        />

        <select
          className="form-control"
          value={this.state.status}
          onChange={e => this.setState({ status: e.target.value })}
        >
          <option value="recommendation">This is a Recommendation</option>
          <option value="want to watch">This is Something I Want To Watch</option>
        </select>
        {this.state.status === "recommendation" ?
        <div>
          <input
            type="text"
            placeholder="Share your impressions (260 characters max)"
            className="form-control"
            value={this.state.impressions}
            onChange={e => this.setState({ impressions: e.target.value })}
          />
        </div> : null
        }

        <datalist id="availableOn">
          <option value="Amazon Prime Video"/>
          <option value="Cinemax"/>
          <option value="Disney Plus"/>
          <option value="HBO"/>
          <option value="Hulu"/>
          <option value="Tvshow Theater"/>
          <option value="Netflix"/>
          <option value="Showtime"/>
          <option value="Starz"/>
        </datalist>

        <button type="submit" className="btn btn-success">
          Submit
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

export default connect(mapStateToProps, { postNewTvshow })(TvshowForm);
