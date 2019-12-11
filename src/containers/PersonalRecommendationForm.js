import React, { Component } from "react";
import { connect } from "react-redux";
import { postNewPersonalRecommendation } from "../store/actions/personalRecommendations"

class PersonalRecommendationForm extends Component {
  constructor(props) {
    super(props);
    let { category } = this.props.location.state
    if (category === "movie" || category ==="tv show") {
      this.state = {
        recipientUsername: "",
        item: `${this.props.location.state.title}`,
        category: `${this.props.location.state.category}`
      }
    }

    if (category === "meal") {
      this.state = {
        recipientUsername: "",
        item: `${this.props.location.state.name} at ${this.props.location.state.restaurant}`,
        category: `${this.props.location.state.category}`
      }
    }
  }

  handleNewPersonalRecommendation = event => {
    event.preventDefault()
    this.props.postNewPersonalRecommendation(this.state)
  }

  render() {
    return (
      <div>
      <form onSubmit={this.handleNewPersonalRecommendation}>
        <h3>Send a Personal Recommendation To A Friend</h3>
        <label>To: </label>
        <span>
          <input
            type="text"
            placeholder="username"
            value={this.state.recipientUsername}
            onChange={e => this.setState({ recipientUsername: e.target.value })}
            className="form-control"
          />
          <label>Recommendation: </label>
          <input
            readOnly
            type="textArea"
            placeholder="item"
            value={this.state.item}
            className="form-control"
          />
          <button>
            Send
          </button>
        </span>
      </form>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    errors: state.errors,
    currentUsername: state.currentUser.user.username
  };
}

export default connect(mapStateToProps, { postNewPersonalRecommendation })(PersonalRecommendationForm);
