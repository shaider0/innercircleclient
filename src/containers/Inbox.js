import React, { Component } from "react";
import { connect } from "react-redux";


class Inbox extends Component {
  constructor(props) {
    super(props)
  }
  render(){
    const { currentUser } = this.props
    return (
      <div>
        <h3>
        </h3>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser.user._id
  };
}

export default connect(mapStateToProps, {})(Inbox);
