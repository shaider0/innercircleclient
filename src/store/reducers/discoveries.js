import { LOAD_DISCOVERIES, REMOVE_DISCOVERY, ADD_DISCOVERY, UPDATE_DISCOVERY } from "../actionTypes";

const discovery = (state = [], action) => {
  switch (action.type) {
    case LOAD_DISCOVERIES:
      return [...action.discoveries];
    case REMOVE_DISCOVERY:
      return (state.filter(discovery => discovery._id !== action.id))
    case ADD_DISCOVERY:
      return [action.discovery, ...state]
    case UPDATE_DISCOVERY:
      return [action.discovery, state.filter(discovery => discovery._id !== action.id)]
    default:
      return state;
  }
};

export default discovery;
