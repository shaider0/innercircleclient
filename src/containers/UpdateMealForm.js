import React, { Component } from "react";
import { connect } from "react-redux";
import { updateMeal } from "../store/actions/meals";
import MealForm from "./MealForm"

class UpdateMealForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.location.state.name,
      restaurant: this.props.location.state.restaurant,
      imageUrl: this.props.location.state.imageUrl,
      impressions: this.props.location.state.impressions,
      status: this.props.location.state.status,
      userId: this.props.location.state.userId,
      mealId: this.props.location.state.mealId
    };
  }

  render() {
    return (
      <div className="update-form">
      <h3>Update Item</h3>
      <MealForm
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

export default connect(mapStateToProps, { updateMeal })(UpdateMealForm);
