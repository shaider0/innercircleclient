import React, { Component } from "react";
import { connect } from "react-redux";
import { updateDiscovery } from "../store/actions/discoveries";
import DiscoveryForm from "./DiscoveryForm"

class UpdateDiscoveryForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.location.state.title,
      description: this.props.location.state.description,
      imageUrl: this.props.location.state.imageUrl,
      status: this.props.location.state.status,
      userId: this.props.location.state.userId,
      discoveryId: this.props.location.state.discoveryId
    };
  }

  render() {
    return (
      <DiscoveryForm
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

export default connect(mapStateToProps, { updateDiscovery })(UpdateDiscoveryForm);
