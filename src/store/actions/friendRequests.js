import { apiCall } from "../../services/api";
import { addError } from "./errors";
import { LOAD_FRIEND_REQUESTS } from "../actionTypes"


export const submitFriendRequest = (requestorId, recipientId) => {

  return dispatch => {
    return apiCall("post", `/api/users/${requestorId}/friendRequests/${recipientId}`)
      .then(res => {
        console.log('friend request created: ', res)
      })
      .catch(err => {
        dispatch(addError(err.message))
      })
  };
};

export const loadFriendRequests = friendRequests => ({
  type: LOAD_FRIEND_REQUESTS,
  friendRequests: friendRequests
});

export const getFriendRequests = (user) => {

  return dispatch => {
    return apiCall("get", `/api/users/${user}/friendRequests/`)
      .then(res => {
        console.log('friend requests from server: ', res)
        return res
      })
      .then(res => {
        dispatch(loadFriendRequests(res))
      })
      .catch(err => {
        dispatch(addError(err.message))
      })
  };
};
