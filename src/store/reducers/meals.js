import { LOAD_MEALS, REMOVE_MEAL, ADD_MEAL } from "../actionTypes";

const meal = (state = [], action) => {
  switch (action.type) {
    case LOAD_MEALS:
      return [...action.meals];
    case REMOVE_MEAL:
      return (state.filter(meal => meal._id !== action.id))
    case ADD_MEAL:
      return [...state, action.meal]
    default:
      return state;
  }
};

export default meal;
