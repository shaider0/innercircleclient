import { combineReducers } from "redux";
import currentUser from "./currentUser";
import errors from "./errors";
import movies from "./movies";
import tvshows from "./tvshows";
import users from "./users";
import friendRequests from "./friendRequests"
import friends from "./friends"

const rootReducer = combineReducers({
  currentUser,
  errors,
  movies,
  tvshows,
  users,
  friendRequests,
  friends
});

export default rootReducer;
