import React, { Component } from "react";
import { connect } from "react-redux";
import { updateDiscovery } from "../store/actions/discoveries";
import DiscoveryForm from "./DiscoveryForm"

class UpdateDiscoveryForm extends Component {
  constructor(props) {
    super(props);
    const { description, imageUrl, status, userId, discoveryId } = this.props.location.state
    this.state = {
      description,
      imageUrl,
      status,
      userId,
      discoveryId
    }
  }

  render() {
    return (
      <div className="update-form">
      <h3>Update Item</h3>
      <DiscoveryForm
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

export default connect(mapStateToProps, { updateDiscovery })(UpdateDiscoveryForm);
