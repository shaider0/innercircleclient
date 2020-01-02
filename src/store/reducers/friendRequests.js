import { LOAD_FRIEND_REQUESTS, REMOVE_FRIEND_REQUEST} from "../actionTypes"

const friendRequests = (state = [], action) => {
  switch (action.type) {
    case LOAD_FRIEND_REQUESTS:
      return [...action.friendRequests]
    case REMOVE_FRIEND_REQUEST:
      return (state.filter(request => request._id !== action._id))
    default:
      return state;
  }
}

export default friendRequests
