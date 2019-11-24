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
      status: "favorite",
    }
  }

  handleNewTvshow = event => {
    event.preventDefault();

    this.props.postNewTvshow(this.state);
    this.setState({
      title: "",
      availableOn: "",
      impressions: "",
      status: "favorite",
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
          placeholder="Tvshow Title"
          className="form-control"
          value={this.state.title}
          onChange={e => this.setState({ title: e.target.value })}
        />
        <input
          placeholder="Where did you watch it?"
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
          <option value="Tvshow Theater"/>
          <option value="Netflix"/>
          <option value="Showtime"/>
          <option value="Starz"/>
        </datalist>
        <input
          type="text"
          placeholder="What were your impressions?"
          className="form-control"
          value={this.state.impressions}
          onChange={e => this.setState({ impressions: e.target.value })}
        />
        <select
          className="form-control"
          value={this.state.status}
          onChange={e => this.setState({ status: e.target.value })}
        >
          <option value="favorite">Favorite</option>
          <option value="want to watch">Want To Watch</option>
        </select>
        <button type="submit" className="btn btn-success">
          Add Recommendation!
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
