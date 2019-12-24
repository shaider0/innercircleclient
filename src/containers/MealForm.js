import React, { Component } from "react";
import { connect } from "react-redux";
import { updateMeal, postNewMeal } from "../store/actions/meals";


class MealForm extends Component {
  constructor(props) {
    super(props);
    if(this.props.type === "update") {
      this.state = this.props.state
    } else {
      this.state = {
        name: "",
        restaurant: "",
        impressions: "",
        image: null,
        status: "recommendation",
      }
    }
  }

  handleNewMeal = event => {
    event.preventDefault();

    this.props.postNewMeal(this.state);
    this.setState({
      name: "",
      restaurant: "",
      impressions: "",
      image: null,
      status: "recommendation",
    });
  };

  handleUpdatedMeal = event => {
    event.preventDefault();
    this.props.updateMeal(this.state);
    this.setState({
      name: "",
      restaurant: "",
      impressions: "",
      image: null,
      status: "recommendation",
    });
  };

  render() {
    let handler = this.handleNewMeal
    let buttonText = "Add Meal"
    if(this.props.type === "update") {
      buttonText = "Save Updates"
      handler = this.handleUpdatedMeal
    }
    return (
      <form className="mealForm" onSubmit={handler}>
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

        <h5>Enter Meal Information</h5>
        <input
          autoFocus
          required
          type="text"
          placeholder="Name"
          className="form-control"
          value={this.state.name}
          onChange={e => this.setState({ name: e.target.value })}
        />

        <input
          required
          type="text"
          placeholder="Restaurant"
          className="form-control"
          value={this.state.restaurant}
          onChange={e => this.setState({ restaurant: e.target.value })}
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

export default connect(mapStateToProps, { postNewMeal, updateMeal })(MealForm);
