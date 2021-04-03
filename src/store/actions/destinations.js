import { apiCall } from "../../services/api";
import { addError } from "./errors";
import { LOAD_DESTINATIONS, REMOVE_DESTINATION, UPDATE_DESTINATION, ADD_DESTINATION } from "../actionTypes";

export const loadDestinations = destinations => ({
  type: LOAD_DESTINATIONS,
  destinations: destinations
});

export const remove = id => ({
  type: REMOVE_DESTINATION,
  id
});

export const update = destination => ({
  type: UPDATE_DESTINATION,
  destination
})


export const addDestination = destination => ({
  type: ADD_DESTINATION,
  destination
});

export const removeDestination = (user_id, destination_id) => {
  return dispatch => {
    return apiCall("delete", `/api/users/${user_id}/destinations/${destination_id}`)
      .then(() => dispatch(remove(destination_id)))
      .catch(err => {
        addError(err.message);
      });
  };
};

export const updateDestination = props => (dispatch, getState) => {

  const updatedDestination = {
    city: props.city,
    state: props.state,
    country: props.country,
    impressions: props.impressions,
    status: props.status,
    image: props.image
  }

  let { currentUser } = getState();
  const id = currentUser.user.id;

  // if update includes an image, only then try posting to AWS
  if (updatedDestination.image) {
    const formData = new FormData()
    const file = updatedDestination.image[0]
    formData.append('file', file)

    return apiCall("post", `/api/users/${id}/images`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    // then, post the destination to mongo, including the image url provided by AWS response
      .then(res => {
        const url = res.Location
        updatedDestination.imageUrl = url
        return apiCall("patch", `/api/users/${props.userId}/destinations/${props.destinationId}`, updatedDestination)
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
    return apiCall("patch", `/api/users/${props.userId}/destinations/${props.destinationId}`, updatedDestination)
      .then(res => {
        dispatch(update(res));
      })
      .catch(err => {
        dispatch(addError(err.message))
      })
  }
}

export const fetchDestinations = (userId) => {
  return dispatch => {
    return apiCall("get", `/api/users/${userId}/destinations`)
      .then(res => {
        dispatch(loadDestinations(res));
      })
      .catch(err => {
        dispatch(addError(err.message));
      });
  };
};

export const postNewDestination = newDestination => (dispatch, getState) => {
  let { currentUser } = getState();
  const id = currentUser.user.id;

  if (newDestination.image) {
    const formData = new FormData()
    const file = newDestination.image[0]
    formData.append('file', file)

    return apiCall("post", `/api/users/${id}/images`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(res => {
        const url = res.Location
        newDestination.imageUrl = url
        return apiCall("post", `/api/users/${id}/destinations`, newDestination)
          .then(res => {
            dispatch(addDestination(res))
            return('success')
          })
          .catch(err => addError(err.destination));
      })
      .catch(err => addError(err))
  }
  else {
    return apiCall("post", `/api/users/${id}/destinations`, newDestination)
      .then(res => {
        dispatch(addDestination(res))
        return('success')
      })
      .catch(err => addError(err.destination));
  }
};
