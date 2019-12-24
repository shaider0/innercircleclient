import { apiCall } from "../../services/api";
import { addError } from "./errors";
import { LOAD_RESTAURANTS, REMOVE_RESTAURANT, UPDATE_RESTAURANT, ADD_RESTAURANT } from "../actionTypes";

export const loadRestaurants = restaurants => ({
  type: LOAD_RESTAURANTS,
  restaurants: restaurants
});

export const remove = id => ({
  type: REMOVE_RESTAURANT,
  id
});

export const update = restaurant => ({
  type: UPDATE_RESTAURANT,
  restaurant
})


export const addRestaurant = restaurant => ({
  type: ADD_RESTAURANT,
  restaurant
});

export const removeRestaurant = (user_id, restaurant_id) => {
  return dispatch => {
    return apiCall("delete", `/api/users/${user_id}/restaurants/${restaurant_id}`)
      .then(() => dispatch(remove(restaurant_id)))
      .catch(err => {
        addError(err.message);
      });
  };
};

export const updateRestaurant = props => (dispatch, getState) => {

  const updatedRestaurant = {
    name: props.name,
    impressions: props.impressions,
    status: props.status,
    image: props.image
  }

  let { currentUser } = getState();
  const id = currentUser.user.id;

  // if update includes an image, only then try posting to AWS
  if (updatedRestaurant.image) {
    const formData = new FormData()
    const file = updatedRestaurant.image[0]
    formData.append('file', file)

    return apiCall("post", `/api/users/${id}/images`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    // then, post the restaurant to mongo, including the image url provided by AWS response
      .then(res => {
        const url = res.Location
        updatedRestaurant.imageUrl = url
        return apiCall("patch", `/api/users/${props.userId}/restaurants/${props.restaurantId}`, updatedRestaurant)
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
    return apiCall("patch", `/api/users/${props.userId}/restaurants/${props.restaurantId}`, updatedRestaurant)
      .then(res => {
        dispatch(update(res));
      })
      .catch(err => {
        dispatch(addError(err.message))
      })
  }
}

export const fetchRestaurants = (userId) => {
  return dispatch => {
    return apiCall("get", `/api/users/${userId}/restaurants`)
      .then(res => {
        dispatch(loadRestaurants(res));
      })
      .catch(err => {
        dispatch(addError(err.message));
      });
  };
};

export const postNewRestaurant = newRestaurant => (dispatch, getState) => {
  let { currentUser } = getState();
  const id = currentUser.user.id;

  if (newRestaurant.image) {
    const formData = new FormData()
    const file = newRestaurant.image[0]
    formData.append('file', file)

    return apiCall("post", `/api/users/${id}/images`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(res => {
        const url = res.Location
        newRestaurant.imageUrl = url
        return apiCall("post", `/api/users/${id}/restaurants`, newRestaurant)
          .then(res => {
            dispatch(addRestaurant(res))
          })
          .catch(err => addError(err.restaurant));
      })
      .catch(err => addError(err))
  }
  else {
    return apiCall("post", `/api/users/${id}/restaurants`, newRestaurant)
      .then(res => {
        dispatch(addRestaurant(res))
      })
      .catch(err => addError(err.restaurant));
  }
};
