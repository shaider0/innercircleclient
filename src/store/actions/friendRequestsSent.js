import { apiCall } from "../../services/api";
import { addError } from "./errors";
import { LOAD_FRIEND_REQUESTS_SENT, ADD_FRIEND_REQUEST_SENT, REMOVE_FRIEND_REQUEST_SENT} from "../actionTypes";

export const loadFriendRequestsSent = friendRequests => ({
  type: LOAD_FRIEND_REQUESTS_SENT,
  friendRequests
});

export const addFriendRequestSent = friendRequest => ({
  type: ADD_FRIEND_REQUEST_SENT,
  friendRequest
});

export const removeFriendRequestSent = request => ({
  type: REMOVE_FRIEND_REQUEST_SENT,
  request
});

export const getFriendRequestsSent = (userId) => {
  return dispatch => {
    return apiCall("get", `/api/users/${userId}/friendRequestsSent`)
      .then(res => {
        console.log('friendrequestssentres', res)
        dispatch(loadFriendRequestsSent(res));
      })
      .catch(err => {
        dispatch(addError(err.message));
      });
  };
};

export const cancelFriendRequestSent = (user_id, request_id) => {
  return dispatch => {
    return apiCall("delete", `/api/users/${user_id}/friendRequestsSent/${request_id}`)
      .then(cancelledRequest => {
        dispatch(removeFriendRequestSent(cancelledRequest))
      })
      .catch(err => {
        addError(err.message);
      });
  };
};
