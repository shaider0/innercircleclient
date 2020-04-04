import { LOAD_FRIENDS, ADD_FRIEND, REMOVE_FRIEND } from "../actionTypes"

const friends = (state = [], action) => {
  switch (action.type) {
    case LOAD_FRIENDS:
      return [...action.friends]
    case REMOVE_FRIEND:
      return state.filter(friend => friend.id != action.friend._id)
    case ADD_FRIEND:
      return [...state, {id: action.friend._id, username: action.friend.username, profileImageUrl: action.friend.profileImageUrl}]
    default:
      return state;
  }
}
export default friends
