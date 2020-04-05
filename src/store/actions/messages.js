import { apiCall } from "../../services/api";
import { addError } from "./errors";
import { LOAD_MESSAGES, REMOVE_MESSAGE, ADD_MESSAGE } from "../actionTypes";

export const loadMessages = messages => ({
  type: LOAD_MESSAGES,
  messages: messages
});

export const remove = id => ({
  type: REMOVE_MESSAGE,
  id
});

export const addMessage = message => ({
  type: ADD_MESSAGE,
  message
});

export const fetchMessages = (userId) => {
  return dispatch => {
    return apiCall("get", `/api/users/${userId}/messages`)
      .then(res => {
        dispatch(loadMessages(res));
      })
      .catch(err => {
        dispatch(addError(err.message));
      });
  };
};

export const addNewMessage = newMessage => (dispatch, getState) => {
  let { currentUser } = getState();
  const id = currentUser.user.id;
  return apiCall("post", `/api/users/${id}/messages`, newMessage)
    .then(res => {
      dispatch(addMessage(res[0]))
      return('success')
    })
    .catch(err => addError(err.message));
};

export const removeMessage = (user_id, message_id) => {
  return dispatch => {
    return apiCall("delete", `/api/users/${user_id}/messages/${message_id}`)
      .then(() => dispatch(remove(message_id)))
      .catch(err => {
        addError(err.message);
      });
  };
};
