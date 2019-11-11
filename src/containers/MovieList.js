import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchMovies, removeMovie } from "../store/actions/movies";
import MovieItem from "../components/MovieItem";

class MovieList extends Component {
  componentDidMount() {
    this.props.fetchMovies();
  }
  render() {
    const { movies, removeMovie, currentUser } = this.props;
    let movieList = movies.map(m => (
      <MovieItem
        key={m._id}
        date={m.createAt}
        text={m.text}
        username={m.user.username}
        profileImageUrl={m.user.profileImageUrl}
        removeMovie={removeMovie.bind(this, m.user._id, m._id)}
        isCorrectUser={currentUser === m.user._id}
      />
    ));
    return (
      <div className="row col-sm-8">
        <div className="offset-1 col-sm-10">
          <ul className="list-group" id="movies">
            {movieList}
          </ul>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    movies: state.movies,
    currentUser: state.currentUser.user.id
  };
}

export default connect(mapStateToProps, { fetchMovies, removeMovie })(
  MovieList
);
