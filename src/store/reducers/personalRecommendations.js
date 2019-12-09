import { ADD_PERSONAL_RECOMMENDATION, LOAD_PERSONAL_RECOMMENDATIONS } from "../actionTypes";

const personalRecommendation = (state = [], action) => {
  switch (action.type) {
    case ADD_PERSONAL_RECOMMENDATION:
      return [...action.personalRecommendation]
    case LOAD_PERSONAL_RECOMMENDATIONS:
      return [...action.personalRecommendations]
    default:
      return state;
  }
}

export default personalRecommendation;
