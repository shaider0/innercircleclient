import { LOAD_FRIEND_REQUESTS } from "../actionTypes"

const friendRequests = (state = [], action) => {
  switch (action.type) {
    case LOAD_FRIEND_REQUESTS:
      return [...action.friendRequests]
    default:
      return state;
  }
}

export default friendRequests
