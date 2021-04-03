import { combineReducers } from "redux";
import currentUser from "./currentUser";
import errors from "./errors";
import movies from "./movies";
import tvshows from "./tvshows";
import restaurants from "./restaurants";
import destinations from "./destinations";
import discoveries from "./discoveries";
import meals from "./meals";
import users from "./users";
import friendRequests from "./friendRequests"
import friendRequestsSent from "./friendRequestsSent"
import friends from "./friends"
import personalRecommendations from "./personalRecommendations"

const rootReducer = combineReducers({
  currentUser,
  errors,
  movies,
  tvshows,
  restaurants,
  meals,
  destinations,
  discoveries,
  users,
  friendRequests,
  friendRequestsSent,
  friends,
  personalRecommendations
});

export default rootReducer;
