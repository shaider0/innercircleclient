import React, { Component } from "react";
import { connect } from "react-redux";
import { updateTvshow } from "../store/actions/tvshows";

class UpdateTvshowForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.location.state.title,
      availableOn: this.props.location.state.availableOn,
      impressions: this.props.location.state.impressions,
      status: this.props.location.state.status,
      userId: this.props.location.state.userId,
      tvshowId: this.props.location.state.tvshowId
    };
  }

  handleUpdatedTvshow = event => {
    event.preventDefault();
    this.props.updateTvshow(this.state);

    this.setState({
      title: "",
      availableOn: "",
      impressions: "",
      status: "",
    });

    this.props.history.push("/");
  };

  render() {
    return (
      <form onSubmit={this.handleUpdatedTvshow }>
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
          <option>Favorite</option>
          <option>Want To Watch</option>
        </select>
        <button type="submit" className="btn btn-success">
          Save Updates
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

export default connect(mapStateToProps, { updateTvshow })(UpdateTvshowForm);
