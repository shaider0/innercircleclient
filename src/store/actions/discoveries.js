import { apiCall } from "../../services/api";
import { addError } from "./errors";
import { LOAD_DISCOVERIES, REMOVE_DISCOVERY, UPDATE_DISCOVERY, ADD_DISCOVERY } from "../actionTypes";

export const loadDiscoveries = discoveries => ({
  type: LOAD_DISCOVERIES,
  discoveries: discoveries
});

export const remove = id => ({
  type: REMOVE_DISCOVERY,
  id
});

export const update = discovery => ({
  type: UPDATE_DISCOVERY,
  discovery
})


export const addDiscovery = discovery => ({
  type: ADD_DISCOVERY,
  discovery
});

export const removeDiscovery = (user_id, discovery_id) => {
  return dispatch => {
    return apiCall("delete", `/api/users/${user_id}/discoveries/${discovery_id}`)
      .then(() => dispatch(remove(discovery_id)))
      .catch(err => {
        addError(err.message);
      });
  };
};

export const updateDiscovery = props => (dispatch, getState) => {

  const updatedDiscovery = {
    name: props.name,
    restaurant: props.restaurant,
    impressions: props.impressions,
    status: props.status,
    image: props.image
  }

  let { currentUser } = getState();
  const id = currentUser.user.id;

  // if update includes an image, only then try posting to AWS
  if (updatedDiscovery.image) {
    const formData = new FormData()
    const file = updatedDiscovery.image[0]
    formData.append('file', file)

    return apiCall("post", `/api/users/${id}/images`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    // then, post the discovery to mongo, including the image url provided by AWS response
      .then(res => {
        const url = res.Location
        updatedDiscovery.imageUrl = url
        return apiCall("patch", `/api/users/${props.userId}/discoveries/${props.discoveryId}`, updatedDiscovery)
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
    return apiCall("patch", `/api/users/${props.userId}/discoveries/${props.discoveryId}`, updatedDiscovery)
      .then(res => {
        dispatch(update(res));
      })
      .catch(err => {
        dispatch(addError(err.message))
      })
  }
}

export const fetchDiscoveries = (userId) => {
  return dispatch => {
    return apiCall("get", `/api/users/${userId}/discoveries`)
      .then(res => {
        dispatch(loadDiscoveries(res));
      })
      .catch(err => {
        dispatch(addError(err.message));
      });
  };
};

export const postNewDiscovery = newDiscovery => (dispatch, getState) => {
  let { currentUser } = getState();
  const id = currentUser.user.id;

  if (newDiscovery.image) {
    const formData = new FormData()
    const file = newDiscovery.image[0]
    formData.append('file', file)

    return apiCall("post", `/api/users/${id}/images`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(res => {
        const url = res.Location
        newDiscovery.imageUrl = url
        return apiCall("post", `/api/users/${id}/discoveries`, newDiscovery)
          .then(res => {
            dispatch(addDiscovery(res))
          })
          .catch(err => addError(err.discovery));
      })
      .catch(err => addError(err))
  }
  else {
    return apiCall("post", `/api/users/${id}/discoveries`, newDiscovery)
      .then(res => {
        dispatch(addDiscovery(res))
      })
      .catch(err => addError(err.discovery));
  }
};
