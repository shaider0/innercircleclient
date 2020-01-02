import { LOAD_USER, REMOVE_USER } from "../actionTypes"

const user = (state = {}, action) => {
  switch (action.type) {
    case LOAD_USER:
      return {...action.user}
    case REMOVE_USER:
      return ({})
    default:
      return state;
  }
}

export default user
