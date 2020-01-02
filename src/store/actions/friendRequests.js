import { apiCall } from "../../services/api";
import { addError } from "./errors";
import { LOAD_FRIEND_REQUESTS, REMOVE_FRIEND_REQUEST } from "../actionTypes"
import { addFriendRequestSent } from "./friendRequestsSent"
import { addFriend, getFriends } from "./friends"
import { removeUser } from "./users"

export const loadFriendRequests = friendRequests => ({
  type: LOAD_FRIEND_REQUESTS,
  friendRequests
});

export const removeFriendRequest = friendRequest => ({
  type: REMOVE_FRIEND_REQUEST,
  friendRequest
})

export const getFriendRequests = user => {
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

export const submitFriendRequest = (requestorId, recipientId) => {
  return dispatch => {
    return apiCall("post", `/api/users/${requestorId}/friendRequests/${recipientId}`)
      .then(res => {
        console.log('submitted friend request is', res)
        dispatch(addFriendRequestSent(res))
        dispatch(removeUser(res.recipient))
        return("success")
      })
      .catch(err => {
        dispatch(addError(err.message))
      })
  };
};

export const acceptFriendRequest = (user, request) => {
  return dispatch => {
    return apiCall("patch", `/api/users/${user}/friendRequests/${request}`, { status: 2 })
      .then((res) => {
        console.log('res after accepting friend request is', res)
        dispatch(addFriend(res.requestor))
        dispatch(removeFriendRequest(res))
      })
      .catch(err => {
        dispatch(addError(err.message))
      })
  }
}

export const rejectFriendRequest = (user, request) => {
    return apiCall("patch", `/api/users/${user}/friendRequests/${request}`, { status: 3 })
}
