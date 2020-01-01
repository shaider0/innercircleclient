import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom"
import { updateDiscovery, postNewDiscovery } from "../store/actions/discoveries";


class DiscoveryForm extends Component {
  constructor(props) {
    super(props);
    if(this.props.type === "update") {
      this.state = this.props.state
    } else {
      this.state = {
        description: "",
        image: null,
        status: "recommendation",
        message: ""
      }
    }
  }

  resetMessage = () => {
    this.setState({
      message: ""
    })
  }

  handleNewDiscovery = event => {
    event.preventDefault();

    this.props.postNewDiscovery(this.state)
    .then(res => {
      if(res==="success") {
    this.setState({
      description: "",
      image: null,
      status: "recommendation",
      message: "Discovery Successfully Added"
    });
  }
  })
  .then(setTimeout(this.resetMessage, 10000))
  };

  handleUpdatedDiscovery = event => {
    event.preventDefault();
    this.props.updateDiscovery(this.state)
    .then(
      this.setState({
        description: "",
        image: null,
        status: "recommendation",
      }))
    .then(this.props.history.push("/"))
  };

  render() {
    let handler = this.handleNewDiscovery
    let buttonText = "Add Discovery"
    if(this.props.type === "update") {
      buttonText = "Save Updates"
      handler = this.handleUpdatedDiscovery
    }
    return (
      <form className="discoveryForm" onSubmit={handler}>
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

        <h5>Enter Discovery Information</h5>
        <input
          required
          type="text"
          placeholder="Description"
          className="form-control"
          value={this.state.description}
          onChange={e => this.setState({ description: e.target.value })}
        />

        <h5>Upload a Photo: </h5>
        <input
          type="file"
          onChange={e => this.setState({ image: e.target.files})}
        />

        <button type="submit" className="btn btn-primary">
          {buttonText}
        </button>
        {this.state.message ? <p className="uiMessage">{this.state.message}</p> : null}
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    errors: state.errors
  };
}

export default withRouter(connect(mapStateToProps, { postNewDiscovery, updateDiscovery })(DiscoveryForm));
