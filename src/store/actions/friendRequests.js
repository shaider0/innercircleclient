import { apiCall } from "../../services/api";
import { addError } from "./errors";
import { LOAD_FRIEND_REQUESTS, REMOVE_FRIEND_REQUEST } from "../actionTypes"
import { addFriendRequestSent } from "./friendRequestsSent"
import { addFriend, getFriends } from "./friends"

export const loadFriendRequests = friendRequests => ({
  type: LOAD_FRIEND_REQUESTS,
  friendRequests: friendRequests
});

export const removeFriendRequest = friendRequest => ({
  type: REMOVE_FRIEND_REQUEST,
  friendRequest
})

export const submitFriendRequest = (requestorId, recipientId) => {
  return dispatch => {
    return apiCall("post", `/api/users/${requestorId}/friendRequests/${recipientId}`)
      .then(res => {
        dispatch(addFriendRequestSent(res))
        return("success")
      })
      .catch(err => {
        dispatch(addError(err.message))
      })
  };
};

export const getFriendRequests = (user) => {
  return dispatch => {
    return apiCall("get", `/api/users/${user}/friendRequests/`)
      .then(res => {
        dispatch(loadFriendRequests(res))
      })
      .catch(err => {
        dispatch(addError(err.message))
      })
  }
}

export const acceptFriendRequest = (user, request) => {
  return dispatch => {
    return apiCall("patch", `/api/users/${user}/friendRequests/${request}`, { status: 2 })
      .then(() => {})
      .catch(err => {
        dispatch(addError(err.message))
      })
  }
}

export const rejectFriendRequest = (user, request) => {
    return apiCall("patch", `/api/users/${user}/friendRequests/${request}`, { status: 3 })
}
