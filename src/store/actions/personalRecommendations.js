import { apiCall } from "../../services/api";
import { addError } from "./errors";
import { LOAD_PERSONAL_RECOMMENDATIONS, ADD_PERSONAL_RECOMMENDATION }from "../actionTypes"

export const addPersonalRecommendation = personalRecommendation => ({
  type: ADD_PERSONAL_RECOMMENDATION,
  personalRecommendation
});

export const loadPersonalRecommendations = personalRecommendations => ({
  type: LOAD_PERSONAL_RECOMMENDATIONS,
  personalRecommendations
})

export const postNewPersonalRecommendation = personalRecommendation => (dispatch, getState) => {
  let { currentUser } = getState();
  const id = currentUser.user.id;
  return apiCall("post", `/api/users/${id}/personalRecommendations`, personalRecommendation)
    .then(res => {
      dispatch(addPersonalRecommendation(res))
    })
    .catch(err => addError(err.personalRecommendation));
};

export const fetchPersonalRecommendations = (userId) => {
  return dispatch => {
    return apiCall("get", `/api/users/${userId}/personalRecommendations`)
      .then(res => {
        dispatch(loadPersonalRecommendations(res))
      })
      .catch(err => {
        dispatch(addError(err.personalRecommendation))
      })
  }
}
