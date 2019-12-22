import { SET_CURRENT_USER, UPDATE_USER_PROFILE_IMAGE, CLOSE_WELCOME_MESSAGE } from "../actionTypes";

const DEFAULT_STATE = {
  isAuthenticated: false, // hopefully be true, when logged in
  user: {} // all the user info when logged in
};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        // turn empty object into false or if there are keys, true
        isAuthenticated: !!Object.keys(action.user).length,
        user: action.user
      }
    case UPDATE_USER_PROFILE_IMAGE:
      return {...state, user: {...state.user, profileImageUrl: action.user.profileImageUrl}}
    case CLOSE_WELCOME_MESSAGE:
      return {...state, user: {...state.user, welcomeMessage: false }}
    default:
      return state;
  }
};
