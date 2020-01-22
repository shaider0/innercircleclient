import React, { Component } from "react";
import { connect } from "react-redux";
import { updateRestaurant } from "../store/actions/restaurants";
import RestaurantForm from "./RestaurantForm"

class UpdateRestaurantForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.location.state.name,
      imageUrl: this.props.location.state.imageUrl,
      impressions: this.props.location.state.impressions,
      status: this.props.location.state.status,
      userId: this.props.location.state.userId,
      restaurantId: this.props.location.state.restaurantId
    };
  }

  render() {
    return (
      <div className="update-form">
      <h3>Update Item</h3>
      <RestaurantForm
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

export default connect(mapStateToProps, { updateRestaurant })(UpdateRestaurantForm);
