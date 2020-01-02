import { apiCall } from "../../services/api";
import { addError } from "./errors";
import { LOAD_FRIENDS, ADD_FRIEND } from "../actionTypes";

export const loadFriends = friends => ({
  type: LOAD_FRIENDS,
  friends
});

export const addFriend = friend => ({
  type: ADD_FRIEND,
  friend
});

export const getFriends = (user) => {
  return dispatch => {
    return apiCall("get", `/api/users/${user}/friends/`)
      .then(res => {
        dispatch(loadFriends(res));
      })
      .catch(err => {
        dispatch(addError(err.message))
      })
  };
};
