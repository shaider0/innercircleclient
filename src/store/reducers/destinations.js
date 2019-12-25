import { LOAD_DESTINATIONS, REMOVE_DESTINATION, ADD_DESTINATION, UPDATE_DESTINATION } from "../actionTypes";

const destination = (state = [], action) => {
  switch (action.type) {
    case LOAD_DESTINATIONS:
      return [...action.destinations];
    case REMOVE_DESTINATION:
      return (state.filter(destination => destination._id !== action.id))
    case ADD_DESTINATION:
      return [...action.destination, ...state]
    case UPDATE_DESTINATION:
      return [...action.destination, state.filter(destination => destination._id !== action.id)]
    default:
      return state;
  }
};

export default destination;
