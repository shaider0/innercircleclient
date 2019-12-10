import { combineReducers } from "redux";
import currentUser from "./currentUser";
import errors from "./errors";
import movies from "./movies";
import tvshows from "./tvshows";
import meals from "./meals";
import users from "./users";
import friendRequests from "./friendRequests"
import friends from "./friends"
import personalRecommendations from "./personalRecommendations"

const rootReducer = combineReducers({
  currentUser,
  errors,
  movies,
  tvshows,
  meals,
  users,
  friendRequests,
  friends,
  personalRecommendations
});

export default rootReducer;
