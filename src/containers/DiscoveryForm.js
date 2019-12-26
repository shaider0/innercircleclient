import React, { Component } from "react";
import { connect } from "react-redux";
import { updateDiscovery, postNewDiscovery } from "../store/actions/discoveries";


class DiscoveryForm extends Component {
  constructor(props) {
    super(props);
    if(this.props.type === "update") {
      this.state = this.props.state
    } else {
      this.state = {
        title: "",
        description: "",
        image: null,
        status: "recommendation",
      }
    }
  }

  handleNewDiscovery = event => {
    event.preventDefault();

    this.props.postNewDiscovery(this.state);
    this.setState({
      title: "",
      description: "",
      image: null,
      status: "recommendation",
    });
  };

  handleUpdatedDiscovery = event => {
    event.preventDefault();
    this.props.updateDiscovery(this.state);
    this.setState({
      title: "",
      description: "",
      image: null,
      status: "recommendation",
    });
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
          placeholder="Title"
          className="form-control"
          value={this.state.title}
          onChange={e => this.setState({ title: e.target.value })}
        />
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
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    errors: state.errors
  };
}

export default connect(mapStateToProps, { postNewDiscovery, updateDiscovery })(DiscoveryForm);
