import { LOAD_TVSHOWS, REMOVE_TVSHOW, ADD_TVSHOW, UPDATE_TVSHOW } from "../actionTypes";

const tvshow = (state = [], action) => {
  switch (action.type) {
    case LOAD_TVSHOWS:
      return [...action.tvshows];
    case REMOVE_TVSHOW:
      return state.filter(tvshow => tvshow._id !== action.id)
    case ADD_TVSHOW:
      return [action.tvshow, ...state]
    case UPDATE_TVSHOW:
      return [...(state.filter(tvshow => tvshow._id !== action.id)), action.tvshow]
    default:
      return state;
  }
};

export default tvshow;
