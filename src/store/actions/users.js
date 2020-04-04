import { apiCall } from "../../services/api";
import { addError } from "./errors";
import { LOAD_USER, REMOVE_USER } from "../actionTypes";

export const loadUser = user => ({
  type: LOAD_USER,
  user
});

export const removeUser = user => ({
  type: REMOVE_USER,
  user
});

export const searchForUser = (props) => {
  return dispatch => {
    return apiCall("get", `/api/users/${props.currentUser.user.id}/potentialFriends/${props.username}`)
      .then(res => {
        dispatch(loadUser(res));
        return res
      })
      .catch(err => {
        dispatch(addError(err.message))
      })
  };
};
