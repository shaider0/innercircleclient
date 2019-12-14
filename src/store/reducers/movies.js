import { LOAD_MOVIES, REMOVE_MOVIE, ADD_MOVIE, UPDATE_MOVIE } from "../actionTypes";

const movie = (state = [], action) => {
  switch (action.type) {
    case LOAD_MOVIES:
      return [...action.movies];
    case REMOVE_MOVIE:
      return (state.filter(movie => movie._id !== action.id))
    case ADD_MOVIE:
      return [...state, action.movie]
    case UPDATE_MOVIE:
      return [...action.movie, state.filter(movie => movie._id !== action.id)]
    default:
      return state;
  }
};

export default movie;
