import { LOAD_FRIENDS, ADD_FRIEND } from "../actionTypes"

const friends = (state = [], action) => {
  switch (action.type) {
    case LOAD_FRIENDS:
      return [...action.friends]
    case ADD_FRIEND:
      return [...state, {id: action.friend._id, username: action.friend.username, profileImageUrl: action.friend.profileImageUrl}]
    default:
      return state;
  }
}
export default friends
