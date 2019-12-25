import React, { Component } from "react";
import { connect } from "react-redux";


class Map extends Component {
  constructor(props) {
    super(props);
      this.state = {
      }
  }


  render() {
    return (
      <div>Map View</div>
    );
  }
}

function mapStateToProps(state) {
  return {
    errors: state.errors
  };
}

export default connect(mapStateToProps, { })(Map);
