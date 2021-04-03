import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom"
import { updateTvshow, postNewTvshow } from "../store/actions/tvshows";

class TvshowForm extends Component {
  constructor(props) {
    super(props);
    if(this.props.type === "update") {
      this.state = this.props.state
    } else {
      this.state = {
        title: "",
        availableOn: "",
        impressions: "",
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

  handleNewTvshow = event => {
    event.preventDefault();

    this.props.postNewTvshow(this.state)
      .then(res => {
        if(res==="success") {
          this.setState({
            title: "",
            availableOn: "",
            impressions: "",
            status: "recommendation",
            message: "TV Show Successfully Added"
          });
        }
      })
      .then(setTimeout(this.resetMessage, 10000))
    };

    handleUpdatedTvshow = event => {
      event.preventDefault();
      this.props.updateTvshow(this.state)
      .then(this.setState({
        title: "",
        availableOn: "",
        impressions: "",
        status: "",
      }))
      .then(this.props.history.push("/"))
    };

  render() {

    const { tvshows } = this.props
    const tvshowTitles = tvshows.map(tvshow => {
      return tvshow.title
    })
    let sortedTvshows = tvshowTitles.sort((a, b) => (a > b) ? -1 : 1)
    let uniqueTvshows = [...new Set(sortedTvshows)]
    const tvshowsDataList = (
      uniqueTvshows.map(tvshow => {
        return <option value={tvshow} key={tvshow}/>
      })
    )

    let handler = this.handleNewTvshow
    let buttonText = "Add Show"
    if(this.props.type === "update") {
      buttonText = "Save Updates"
      handler = this.handleUpdatedTvshow
    }
    return (
      <form onSubmit={handler} className="tvshowForm">
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
        <i className="fas fa-tv"></i>
        <h5>Enter Show Information</h5>
        <datalist id="tvshows">
          {tvshowsDataList}
        </datalist>
        <input
          list="tvshows"
          required
          type="text"
          placeholder="Title"
          className="form-control"
          value={this.state.title}
          onChange={e => this.setState({ title: e.target.value })}
        />
        {this.state.status === "recommendation" ?
        <div>
          <input
            type="text"
            placeholder="Optional - Your Impressions (120 characters max)"
            className="form-control"
            value={this.state.impressions}
            onChange={e => this.setState({ impressions: e.target.value })}
          />
        </div> : null
        }
        <input
          placeholder="Optional - Where It's Available (e.g., Netflix, Hulu, Amazon Prime Video, etc.)"
          type="text"
          list="availableOn"
          className="form-control"
          value={this.state.availableOn}
          onChange={e => this.setState({ availableOn: e.target.value })}
        />

        <datalist id="availableOn">
          <option value="Amazon Prime Video"/>
          <option value="Cinemax"/>
          <option value="Disney Plus"/>
          <option value="HBO"/>
          <option value="Hulu"/>
          <option value="Tvshow Theater"/>
          <option value="Netflix"/>
          <option value="Showtime"/>
          <option value="Starz"/>
        </datalist>

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
    errors: state.errors,
    tvshows: state.tvshows
  };
}

export default withRouter(connect(mapStateToProps, { updateTvshow, postNewTvshow })(TvshowForm));
