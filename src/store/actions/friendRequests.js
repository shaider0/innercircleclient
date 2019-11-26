import { apiCall } from "../../services/api";
import { addError } from "./errors";
// import { LOAD_FRIEND_REQUEST } from "../actionTypes";

// export const loadFriendRequest = friendRequest => ({
//   type: LOAD_FRIEND_REQUEST,
//   friendRequest
// });

export const submitFriendRequest = (requestorId, recipientId) => {

  return dispatch => {
    return apiCall("post", `/api/users/${requestorId}/friendRequests/${recipientId}`)
      .then(res => {
        console.log('friend request created: ', res)
      })
      // .then(res => {
      //   dispatch(loadFriendRequest(res));
      // })
      .catch(err => {
        dispatch(addError(err.message))
      })
  };
};
