import { combineReducers } from "redux";
import currentUser from "./currentUser";
import errors from "./errors";
import movies from "./movies";
import tvshows from "./tvshows";

const rootReducer = combineReducers({
  currentUser,
  errors,
  movies,
  tvshows
});

export default rootReducer;
