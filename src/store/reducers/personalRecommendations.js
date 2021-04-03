import { ADD_PERSONAL_RECOMMENDATION, LOAD_PERSONAL_RECOMMENDATIONS, REMOVE_PERSONAL_RECOMMENDATION } from "../actionTypes";

const personalRecommendation = (state = [], action) => {
  switch (action.type) {
    case ADD_PERSONAL_RECOMMENDATION:
      return [...action.personalRecommendation]
    case LOAD_PERSONAL_RECOMMENDATIONS:
      return [...action.personalRecommendations]
    case REMOVE_PERSONAL_RECOMMENDATION:
      return (state.filter(recommendation => recommendation._id !== action.personalRecommendationId))
    default:
      return state;
  }
}

export default personalRecommendation;
