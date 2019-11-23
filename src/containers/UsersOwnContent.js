import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchMovies, removeMovie, updateMovie } from "../store/actions/movies";
import { fetchTvshows, removeTvshow, updateTvshow } from "../store/actions/tvshows";
import MovieItem from "../components/MovieItem";
import TvshowItem from "../components/TvshowItem";

class UsersOwnContent extends Component {

  componentDidMount() {
    this.props.fetchMovies();
    this.props.fetchTvshows();
  }

  render() {

    const { movies, removeMovie, updateMovie, tvshows, removeTvshow, updateTvshow, currentUser } = this.props;
    let feedItems = [...movies, ...tvshows]
    let userItems = feedItems.filter(item => item.user._id === currentUser)
    userItems = userItems.sort((a, b) => (a.title > b.title) ? 1 : -1)
    let userList = userItems.map(m => {
      if (m.category == 'tvshow'){
      return (<TvshowItem
          key={m._id}
          date={m.createAt}
          category={m.category}
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
      />)}
      else if (m.category == 'movie') {
      return (<MovieItem
        key={m._id}
        date={m.createAt}
        category={m.category}
        title={m.title}
        availableOn={m.availableOn}
        impressions={m.impressions}
        status={m.status}
        movieId={m._id}
        username={m.user.username}
        userId={m.user._id}
        profileImageUrl={m.user.profileImageUrl}
        removeMovie={removeMovie.bind(this, m.user._id, m._id)}
        updateMovie={updateMovie.bind(this, m.user._id, m._id)}
        isCorrectUser={currentUser === m.user._id}
      />)}
    }
  );

    return (
      <div className="row col-sm-8">
        <div className="offset-1 col-sm-10">
          <ul className="list-group">
            {userList}
          </ul>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    movies: state.movies,
    tvshows: state.tvshows,
    currentUser: state.currentUser.user.id
  };
}

export default connect(mapStateToProps, { fetchMovies, removeMovie, updateMovie, fetchTvshows, removeTvshow, updateTvshow })(
  UsersOwnContent
);
