import { apiCall } from "../../services/api";
import { addError } from "./errors";
import { LOAD_FRIENDS, ADD_FRIEND, REMOVE_FRIEND } from "../actionTypes";
import { removeUser } from "./users"

export const loadFriends = friends => ({
  type: LOAD_FRIENDS,
  friends
});

export const addFriend = friend => ({
  type: ADD_FRIEND,
  friend
});

export const removeFriend = friend => ({
  type: REMOVE_FRIEND,
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

export const deleteFriend = (userId, friendId) => {
  return dispatch => {
    return apiCall("delete", `/api/users/${userId}/friends/${friendId}`)
      .then(res => {
      dispatch(removeFriend({ _id: friendId }))
      })
      .catch(err => {
        addError(err.message);
      })
  }
}
