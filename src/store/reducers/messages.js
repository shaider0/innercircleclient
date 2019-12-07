import { ADD_MESSAGE, LOAD_MESSAGES } from "../actionTypes";

const message = (state = [], action) => {
  switch (action.type) {
    case ADD_MESSAGE:
      return [...action.message]
    case LOAD_MESSAGES:
      return [...action.messages]
    default:
      return state;
  }
}

export default message;
