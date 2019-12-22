import { apiCall } from "../../services/api";
import { addError } from "./errors";
import { UPDATE_USER_PROFILE_IMAGE, CLOSE_WELCOME_MESSAGE } from "../actionTypes";

export const updateUser = user => ({
  type: UPDATE_USER_PROFILE_IMAGE,
  user
});

export const closeMessage = () => ({
  type: CLOSE_WELCOME_MESSAGE
});


export const updateUserProfileImage = props => (dispatch, getState) => {
  const { image } = props
  let { currentUser } = getState();
  const id = currentUser.user.id;

  if (image) {
    const formData = new FormData()
    const file = image[0]
    formData.append('file', file)

    return apiCall("post", `/api/users/${id}/images`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(res => {
        const url = res.Location
        return apiCall("patch", `/api/users/${id}/profile`, {url})
          .then(res => {
            dispatch(updateUser(res))
          })
          .catch(err => addError(err.meal));
      })
      .catch(err => addError(err))
  }
}

export const closeWelcomeMessage = () => (dispatch, getState) => {
  let { currentUser } = getState();
  const id = currentUser.user.id;
  return apiCall("patch", `/api/users/${id}/welcomeMessage`)
    .then(res => {
      dispatch(closeMessage())
    })
    .catch(err => addError(err.message));
}
