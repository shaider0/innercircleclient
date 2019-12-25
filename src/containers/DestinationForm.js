import React, { Component } from "react";
import { connect } from "react-redux";
import { updateDestination, postNewDestination } from "../store/actions/destinations";


class DestinationForm extends Component {
  constructor(props) {
    super(props);
    if(this.props.type === "update") {
      this.state = this.props.state
    } else {
      this.state = {
        city: "",
        state: "",
        country: "",
        impressions: "",
        image: null,
        status: "recommendation",
      }
    }
  }

  handleNewDestination = event => {
    event.preventDefault();

    this.props.postNewDestination(this.state);
    this.setState({
      city: "",
      state: "",
      country: "",
      impressions: "",
      image: null,
      status: "recommendation",
    });
  };

  handleUpdatedDestination = event => {
    event.preventDefault();
    this.props.updateDestination(this.state);
    this.setState({
      city: "",
      state: "",
      country: "",
      impressions: "",
      image: null,
      status: "recommendation",
    });
  };

  render() {
    let handler = this.handleNewDestination
    let buttonText = "Add Destination"
    if(this.props.type === "update") {
      buttonText = "Save Updates"
      handler = this.handleUpdatedDestination
    }
    return (
      <form className="destinationForm" onSubmit={handler}>
        {this.props.errors.message && (
          <div className="alert alert-danger">{this.props.errors.message}</div>
        )}

        <h5>Choose a Type</h5>
        <select
          className="form-control"
          value={this.state.status}
          onChange={e => this.setState({ status: e.target.value })}
        >
          <option value="recommendation">Recommendation</option>
          <option value="bookmark">Bookmark</option>
        </select>

        <h5>Enter Destination Information</h5>

        <input
          required
          type="text"
          placeholder="City"
          className="form-control"
          value={this.state.city}
          onChange={e => this.setState({ city: e.target.value })}
        />
        <input
          required
          type="text"
          placeholder="State"
          className="form-control"
          value={this.state.state}
          onChange={e => this.setState({ state: e.target.value })}
        />
        <input
          required
          type="text"
          placeholder="Country"
          className="form-control"
          value={this.state.country}
          onChange={e => this.setState({ country: e.target.value })}
        />

        {this.state.status === "recommendation" ?
          <div>
            <input
              type="text"
              placeholder="Optional - Your Impressions (120 characters max)"
              className="form-control"
              value={this.state.impressions}
              onChange={e => this.setState({ impressions: e.target.value })}
            />
          </div>
          : null
        }

        <h5>Upload a Photo: </h5>
        <input
          type="file"
          onChange={e => this.setState({ image: e.target.files})}
        />

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

export default connect(mapStateToProps, { postNewDestination, updateDestination })(DestinationForm);
