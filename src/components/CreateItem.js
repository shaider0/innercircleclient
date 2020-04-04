import React, { Component } from "react";
import { connect } from "react-redux";
import CreatePostForm from "./CreatePostForm"

import { Link } from "react-router-dom"

class CreateItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  render() {
    let form = <CreatePostForm />

    return (
      <div className="createItemForm">
        {form}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    errors: state.errors
  };
}

export default connect(mapStateToProps, { })(CreateItem);
