import { LOAD_FRIENDS, ADD_FRIEND } from "../actionTypes"

const friends = (state = [], action) => {
  switch (action.type) {
    case LOAD_FRIENDS:
      return [...action.friends]
    case ADD_FRIEND:
      return [...state, {id: action._id, username: action.username, profileImgUrl: action.profileImgUrl}]
    default:
      return state;
  }
}
export default friends
