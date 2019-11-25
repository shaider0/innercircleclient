import { combineReducers } from "redux";
import currentUser from "./currentUser";
import errors from "./errors";
import movies from "./movies";
import tvshows from "./tvshows";
import users from "./users";

const rootReducer = combineReducers({
  currentUser,
  errors,
  movies,
  tvshows,
  users
});

export default rootReducer;
