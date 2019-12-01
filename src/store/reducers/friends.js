import { LOAD_FRIENDS } from "../actionTypes"

const friends = (state = [], action) => {
  switch (action.type) {
    case LOAD_FRIENDS:
      return [...action.friends]
    default:
      return state;
  }
}

export default friends
