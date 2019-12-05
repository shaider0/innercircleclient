import React, { Component } from "react";
import { connect } from "react-redux";
import { updateTvshow } from "../store/actions/tvshows";
import TvshowForm from "./TvshowForm"

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

  render() {
    return (
      <TvshowForm
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

export default connect(mapStateToProps, { updateTvshow })(UpdateTvshowForm);
