import { apiCall } from "../../services/api";
import { addError } from "./errors";
import { LOAD_TVSHOWS, REMOVE_TVSHOW, UPDATE_TVSHOW, ADD_TVSHOW } from "../actionTypes";

export const loadTvshows = tvshows => ({
  type: LOAD_TVSHOWS,
  tvshows
});

export const remove = id => ({
  type: REMOVE_TVSHOW,
  id
});

export const update = tvshow => ({
  type: UPDATE_TVSHOW,
  tvshow
})

export const addTvshow = tvshow => ({
  type: ADD_TVSHOW,
  tvshow
});

export const removeTvshow = (user_id, tvshow_id) => {
  return dispatch => {
    return apiCall("delete", `/api/users/${user_id}/tvshows/${tvshow_id}`)
      .then(() => dispatch(remove(tvshow_id)))
      .catch(err => {
        addError(err.message);
      });
  };
};

export const updateTvshow = (props) => {
  console.log(props)
  const updatedTvshow = {
    title: props.title,
    availableOn: props.availableOn,
    impressions: props.impressions,
    status: props.status
  }
  return dispatch => {
    return apiCall("patch", `/api/users/${props.userId}/tvshows/${props.tvshowId}`, updatedTvshow)
      .then(res => {
        dispatch(update(res));
      })
      .catch(err => {
        dispatch(addError(err.message))
      })
  };
};

export const fetchTvshows = (userId) => {
  return dispatch => {
    return apiCall("get", `/api/users/${userId}/tvshows`)
      .then(res => {
        dispatch(loadTvshows(res));
      })
      .catch(err => {
        dispatch(addError(err.message));
      });
  };
};

export const postNewTvshow = newTvshow => (dispatch, getState) => {
  let { currentUser } = getState();
  const id = currentUser.user.id;
  return apiCall("post", `/api/users/${id}/tvshows`, newTvshow)
    .then(res => {
      dispatch(addTvshow(res))
    })
    .catch(err => addError(err.tvshow));
};
