import React, { Component } from "react";
import { connect } from "react-redux";
import { updateDestination } from "../store/actions/destinations";
import DestinationForm from "./DestinationForm"

class UpdateDestinationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: this.props.location.state.city,
      state: this.props.location.state.state,
      country: this.props.location.state.country,
      imageUrl: this.props.location.state.imageUrl,
      impressions: this.props.location.state.impressions,
      status: this.props.location.state.status,
      userId: this.props.location.state.userId,
      destinationId: this.props.location.state.destinationId
    };
  }

  render() {
    return (
      <DestinationForm
        type="update" state={this.state}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    errors: state.errors
  };
}

export default connect(mapStateToProps, { updateDestination })(UpdateDestinationForm);
