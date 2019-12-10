import { apiCall } from "../../services/api";
import { addError } from "./errors";
import { LOAD_PERSONAL_RECOMMENDATIONS, ADD_PERSONAL_RECOMMENDATION, REMOVE_PERSONAL_RECOMMENDATION }from "../actionTypes"

export const addPersonalRecommendation = personalRecommendation => ({
  type: ADD_PERSONAL_RECOMMENDATION,
  personalRecommendation
});

export const loadPersonalRecommendations = personalRecommendations => ({
  type: LOAD_PERSONAL_RECOMMENDATIONS,
  personalRecommendations
})

export const removeRecommendation = personalRecommendationId => ({
  type: REMOVE_PERSONAL_RECOMMENDATION,
  personalRecommendationId
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

export const deletePersonalRecommendation = (user_id, personalRecommendation_id) => {
  return dispatch => {
    return apiCall("delete", `/api/users/${user_id}/personalRecommendations/${personalRecommendation_id}`)
      .then(() => dispatch(removeRecommendation(personalRecommendation_id)))
      .catch(err => {
        addError(err.message);
      });
  };
};
