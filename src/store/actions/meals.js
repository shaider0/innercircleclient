import { apiCall } from "../../services/api";
import { addError } from "./errors";
import { LOAD_MEALS, REMOVE_MEAL, UPDATE_MEAL, ADD_MEAL } from "../actionTypes";

export const loadMeals = meals => ({
  type: LOAD_MEALS,
  meals: meals
});

export const remove = id => ({
  type: REMOVE_MEAL,
  id
});

export const addMeal = meal => ({
  type: ADD_MEAL,
  meal
});

export const removeMeal = (user_id, meal_id) => {
  return dispatch => {
    return apiCall("delete", `/api/users/${user_id}/meals/${meal_id}`)
      .then(() => dispatch(remove(meal_id)))
      .catch(err => {
        addError(err.message);
      });
  };
};

export const updateMeal = (props) => {
  console.log(props)
  const updatedMeal = {
    name: props.name,
    restaurant: props.restaurant,
    imageUrl: props.imageUrl,
    impressions: props.impressions,
    status: props.status
  }
  return dispatch => {
    return apiCall("patch", `/api/users/${props.userId}/meals/${props.mealId}`, updatedMeal)
      .then(()=> apiCall("GET", `/api/users/${props.userId}/meals`))
      .then(res => {
        dispatch(loadMeals(res));
      })
      .catch(err => {
        dispatch(addError(err.message))
      })
  };
};

export const fetchMeals = (userId) => {
  return dispatch => {
    return apiCall("get", `/api/users/${userId}/meals`)
      .then(res => {
        dispatch(loadMeals(res));
      })
      .catch(err => {
        dispatch(addError(err.message));
      });
  };
};

export const postNewMeal = newMeal => (dispatch, getState) => {
  // first handle image
  const formData = new FormData()
  const file = newMeal.image[0]
  formData.append('file', file)
  // check out the endpoint
  apiCall("post", `/image-upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })

  let { currentUser } = getState();
  const id = currentUser.user.id;
  return apiCall("post", `/api/users/${id}/meals`, newMeal)
    .then(res => {
      dispatch(addMeal(res))
    })
    .catch(err => addError(err.meal));
};
