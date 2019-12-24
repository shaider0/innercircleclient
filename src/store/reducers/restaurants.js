import { LOAD_RESTAURANTS, REMOVE_RESTAURANT, ADD_RESTAURANT, UPDATE_RESTAURANT } from "../actionTypes";

const restaurant = (state = [], action) => {
  switch (action.type) {
    case LOAD_RESTAURANTS:
      return [...action.restaurants];
    case REMOVE_RESTAURANT:
      return (state.filter(restaurant => restaurant._id !== action.id))
    case ADD_RESTAURANT:
      return [...action.restaurant, ...state]
    case UPDATE_RESTAURANT:
      return [...action.restaurant, state.filter(restaurant => restaurant._id !== action.id)]
    default:
      return state;
  }
};

export default restaurant;
