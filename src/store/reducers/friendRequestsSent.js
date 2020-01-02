import { LOAD_FRIEND_REQUESTS_SENT, ADD_FRIEND_REQUEST_SENT, REMOVE_FRIEND_REQUEST_SENT } from "../actionTypes"

const friendRequestsSent = (state = [], action) => {
  switch (action.type) {
    case LOAD_FRIEND_REQUESTS_SENT:
      return [...action.friendRequests]
    case ADD_FRIEND_REQUEST_SENT:
      return [action.friendRequest, ...state]
    case REMOVE_FRIEND_REQUEST_SENT:
    return (
      state.filter(request => {
        request._id !== action.request.id
      })
    )
    default:
      return state;
  }
}

export default friendRequestsSent
