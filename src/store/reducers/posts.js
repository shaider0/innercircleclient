import { LOAD_POSTS, REMOVE_POST, ADD_POST, UPDATE_POST } from "../actionTypes";

const post = (state = [], action) => {
  switch (action.type) {
    case LOAD_POSTS:
      return [...action.posts];
    case REMOVE_POST:
      return (state.filter(post => post._id !== action.id))
    case ADD_POST:
      return [action.post, ...state]
    case UPDATE_POST:
      return [action.post, ...(state.filter(post => post._id !== action.id))]
    default:
      return state;
  }
};

export default post;
