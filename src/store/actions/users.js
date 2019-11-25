import { apiCall } from "../../services/api";
import { addError } from "./errors";
import { LOAD_USER } from "../actionTypes";

export const loadUser = user => ({
  type: LOAD_USER,
  user
});

export const searchForUser = (props) => {
  let user = {
    username: props.username
  }
  return dispatch => {
    return apiCall("get", `/api/users/${props.currentUser.user.id}/potentialFriends/${props.username}`)
      .then(res => {
        dispatch(loadUser(res));
      })
      .catch(err => {
        dispatch(addError(err.message))
      })
  };
};
