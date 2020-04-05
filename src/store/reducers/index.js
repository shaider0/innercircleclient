import { combineReducers } from "redux";
import currentUser from "./currentUser";
import errors from "./errors";
import posts from "./posts";
import messages from "./messages";
import users from "./users";
import friendRequests from "./friendRequests"
import friendRequestsSent from "./friendRequestsSent"
import friends from "./friends"

const rootReducer = combineReducers({
  currentUser,
  errors,
  posts,
  messages,
  users,
  friendRequests,
  friendRequestsSent,
  friends
});

export default rootReducer;
