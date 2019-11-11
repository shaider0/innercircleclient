import { combineReducers } from "redux";
import currentUser from "./currentUser";
import errors from "./errors";
import movies from "./movies";

const rootReducer = combineReducers({
  currentUser,
  errors,
  movies
});

export default rootReducer;
