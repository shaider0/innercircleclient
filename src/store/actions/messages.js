import { apiCall } from "../../services/api";
import { addError } from "./errors";
import { LOAD_MESSAGES, ADD_MESSAGE }from "../actionTypes"

export const addMessage = message => ({
  type: ADD_MESSAGE,
  message
});

export const loadMessages = messages => ({
  type: LOAD_MESSAGES,
  messages
})

export const postNewMessage = message => (dispatch, getState) => {
  let { currentUser } = getState();
  const id = currentUser.user.id;
  return apiCall("post", `/api/users/${id}/messages`, message)
    .then(res => {
      dispatch(addMessage(res))
    })
    .catch(err => addError(err.message));
};

export const fetchMessages = (userId) => {
  return dispatch => {
    return apiCall("get", `/api/users/${userId}/messages`)
      .then(res => {
        dispatch(loadMessages(res))
      })
      .catch(err => {
        dispatch(addError(err.message))
      })
  }
}
