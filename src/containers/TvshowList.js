import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchTvshows, removeTvshow, updateTvshow } from "../store/actions/tvshows";
import TvshowItem from "../components/TvshowItem";

class TvshowList extends Component {
  componentDidMount() {
    this.props.fetchTvshows();
  }

  render() {
    const { tvshows, removeTvshow, updateTvshow, currentUser } = this.props;
    let tvshowList = tvshows.map(m => (
      <TvshowItem
        key={m._id}
        date={m.createAt}
        title={m.title}
        availableOn={m.availableOn}
        impressions={m.impressions}
        status={m.status}
        tvshowId={m._id}
        username={m.user.username}
        userId={m.user._id}
        profileImageUrl={m.user.profileImageUrl}
        removeTvshow={removeTvshow.bind(this, m.user._id, m._id)}
        updateTvshow={updateTvshow.bind(this, m.user._id, m._id)}
        isCorrectUser={currentUser === m.user._id}
      />
    ));
    return (
      <div className="row col-sm-8">
        <div className="offset-1 col-sm-10">
          <ul className="list-group" id="tvshows">
            {tvshowList}
          </ul>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    tvshows: state.tvshows,
    currentUser: state.currentUser.user.id
  };
}

export default connect(mapStateToProps, { fetchTvshows, removeTvshow, updateTvshow })(
  TvshowList
);
