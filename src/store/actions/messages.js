import { apiCall } from "../../services/api";
import { addError } from "./errors";
import { ADD_MESSAGE }from "../actionTypes"

export const addMessage = message => ({
  type: ADD_MESSAGE,
  message
});

export const postNewMessage = message => (dispatch, getState) => {
  let { currentUser } = getState();
  const id = currentUser.user.id;
  return apiCall("post", `/api/users/${id}/messages`, message)
    .then(res => {
      dispatch(addMessage(res))
    })
    .catch(err => addError(err.message));
};
