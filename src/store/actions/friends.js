import { apiCall } from "../../services/api";
import { addError } from "./errors";
import { LOAD_FRIENDS } from "../actionTypes";

export const loadFriends = friends => ({
  type: LOAD_FRIENDS,
  friends
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
