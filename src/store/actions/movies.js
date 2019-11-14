import { apiCall } from "../../services/api";
import { addError } from "./errors";
import { LOAD_MOVIES, REMOVE_MOVIE, UPDATE_MOVIE } from "../actionTypes";

export const loadMovies = movies => ({
  type: LOAD_MOVIES,
  movies
});

export const remove = id => ({
  type: REMOVE_MOVIE,
  id
});

export const removeMovie = (user_id, movie_id) => {
  return dispatch => {
    return apiCall("delete", `/api/users/${user_id}/movies/${movie_id}`)
      .then(() => dispatch(remove(movie_id)))
      .catch(err => {
        addError(err.message);
      });
  };
};

export const updateMovie = (props) => {
  console.log(props)
  const updatedMovie = {
    title: props.title,
    availableOn: props.availableOn,
    impressions: props.impressions,
    status: props.status
  }
  return dispatch => {
    return apiCall("patch", `/api/users/${props.userId}/movies/${props.movieId}`, updatedMovie)
      .then(document.location.href="/")
      .catch(err => {
        addError(err.message);
      });
  };
};

export const fetchMovies = () => {
  return dispatch => {
    return apiCall("GET", "/api/movies")
      .then(res => {
        dispatch(loadMovies(res));
      })
      .catch(err => {
        dispatch(addError(err.message));
      });
  };
};

export const postNewMovie = newMovie => (dispatch, getState) => {
  let { currentUser } = getState();
  const id = currentUser.user.id;
  return apiCall("post", `/api/users/${id}/movies`, newMovie)
    .then(res => {})
    .catch(err => addError(err.movie));
};
