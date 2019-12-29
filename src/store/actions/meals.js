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

export const update = meal => ({
  type: UPDATE_MEAL,
  meal
})


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

export const updateMeal = props => (dispatch, getState) => {

  const updatedMeal = {
    name: props.name,
    restaurant: props.restaurant,
    impressions: props.impressions,
    status: props.status,
    image: props.image
  }

  let { currentUser } = getState();
  const id = currentUser.user.id;

  // if update includes an image, only then try posting to AWS
  if (updatedMeal.image) {
    const formData = new FormData()
    const file = updatedMeal.image[0]
    formData.append('file', file)

    return apiCall("post", `/api/users/${id}/images`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    // then, post the meal to mongo, including the image url provided by AWS response
      .then(res => {
        const url = res.Location
        updatedMeal.imageUrl = url
        return apiCall("patch", `/api/users/${props.userId}/meals/${props.mealId}`, updatedMeal)
          .then(res => {
            dispatch(update(res));
          })
          .catch(err => {
            dispatch(addError(err.message))
          })
      })
      .catch(err => addError(err))
  }
  else {
    return apiCall("patch", `/api/users/${props.userId}/meals/${props.mealId}`, updatedMeal)
      .then(res => {
        dispatch(update(res));
      })
      .catch(err => {
        dispatch(addError(err.message))
      })
  }
}

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
  let { currentUser } = getState();
  const id = currentUser.user.id;

  if (newMeal.image) {
    const formData = new FormData()
    const file = newMeal.image[0]
    formData.append('file', file)

    return apiCall("post", `/api/users/${id}/images`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(res => {
        const url = res.Location
        newMeal.imageUrl = url
        return apiCall("post", `/api/users/${id}/meals`, newMeal)
          .then(res => {
            dispatch(addMeal(res))
            return('success')
          })
          .catch(err => addError(err.meal));
      })
      .catch(err => addError(err))
  }
  else {
    return apiCall("post", `/api/users/${id}/meals`, newMeal)
      .then(res => {
        dispatch(addMeal(res))
        return('success')
      })
      .catch(err => addError(err.meal));
  }
};
