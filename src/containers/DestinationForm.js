import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom"
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
        message: ""
      }
    }
  }

  resetMessage = () => {
    this.setState({
      message: ""
    })
  }

  handleNewDestination = event => {
    event.preventDefault();

  this.props.postNewDestination(this.state)
    .then(res => {
      if(res==="success") {
    this.setState({
      city: "",
      state: "",
      country: "",
      impressions: "",
      image: null,
      status: "recommendation",
      message: "Destination Successfully Added"
        });
      }
    })
    .then(setTimeout(this.resetMessage, 10000))
  };

  handleUpdatedDestination = event => {
    event.preventDefault();
    this.props.updateDestination(this.state)
    .then(this.setState({
      city: "",
      state: "",
      country: "",
      impressions: "",
      image: null,
      status: "recommendation",
    }))
    .then(this.props.history.push("/"))
  };

  render() {

    const { destinations } = this.props

    const cities = destinations.map(destination => {
      return destination.city
    })
    let sortedCities = cities.sort((a, b) => (a > b) ? -1 : 1)
    let uniqueCities = [...new Set(sortedCities)]
    const citiesDataList = (
      uniqueCities.map(city => {
        return <option value={city} key={city}/>
      })
    )

    const states = destinations.map(destination => {
      return destination.state
    })
    let sortedStates = states.sort((a, b) => (a > b) ? -1 : 1)
    let uniqueStates = [...new Set(sortedStates)]
    const statesDataList = (
      uniqueStates.map(state => {
        return <option value={state} key={state}/>
      })
    )

    const countries = destinations.map(destination => {
      return destination.country
    })
    let sortedCountries = countries.sort((a, b) => (a > b) ? -1 : 1)
    let uniqueCountries = [...new Set(sortedCountries)]
    const countriesDataList = (
      uniqueCountries.map(country => {
        return <option value={country} key={country}/>
      })
    )

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
        <i className="fas fa-plane"></i>
        <h5>Enter Destination Information</h5>
        <datalist id="cities">
          {citiesDataList}
        </datalist>
        <input
          list="cities"
          required
          type="text"
          placeholder="City"
          className="form-control"
          value={this.state.city}
          onChange={e => this.setState({ city: e.target.value })}
        />
        <datalist id="states">
          {statesDataList}
        </datalist>
        <input
          list="states"
          required
          type="text"
          placeholder="State"
          className="form-control"
          value={this.state.state}
          onChange={e => this.setState({ state: e.target.value })}
        />
        <datalist id="countries">
          {countriesDataList}
        </datalist>
        <input
          list="countries"
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
        {this.state.message ? <p className="uiMessage">{this.state.message}</p> : null}
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    errors: state.errors,
    destinations: state.destinations
  };
}

export default withRouter(connect(mapStateToProps, { postNewDestination, updateDestination })(DestinationForm));
