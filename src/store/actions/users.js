import { apiCall } from "../../services/api";
import { addError } from "./errors";
import { LOAD_USER, UPDATE_USER_PROFILE_IMAGE } from "../actionTypes";

export const loadUser = user => ({
  type: LOAD_USER,
  user
});

export const updateUser = user => ({
  type: UPDATE_USER_PROFILE_IMAGE,
  user
});



export const searchForUser = (props) => {
  return dispatch => {
    return apiCall("get", `/api/users/${props.currentUser.user.id}/potentialFriends/${props.username}`)
      .then(res => {
        dispatch(loadUser(res));
      })
      .catch(err => {
        dispatch(addError(err.message))
      })
  };
};

export const updateUserProfileImage = (user, url) => {
  return dispatch => {
    console.log('patching...')

    return apiCall("patch", `/api/users/${user}/profile`, {url: url})
      .then(res => {
        dispatch(updateUser({profileImageUrl: url}));
      })
      .catch(err => {
        dispatch(addError(err.message))
      })
  };
};
