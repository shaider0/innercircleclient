import { apiCall } from "../../services/api";
import { addError } from "./errors";
import { LOAD_POSTS, REMOVE_POST, UPDATE_POST, ADD_POST } from "../actionTypes";

export const loadPosts = posts => ({
  type: LOAD_POSTS,
  posts: posts
});

export const remove = id => ({
  type: REMOVE_POST,
  id
});

export const update = post => ({
  type: UPDATE_POST,
  post
})


export const addPost = post => ({
  type: ADD_POST,
  post
});

export const removePost = (user_id, post_id) => {
  return dispatch => {
    return apiCall("delete", `/api/users/${user_id}/posts/${post_id}`)
      .then(() => dispatch(remove(post_id)))
      .catch(err => {
        addError(err.message);
      });
  };
};

export const updatePost = props => (dispatch, getState) => {

  const updatedPost = {
    content: props.content,
    image: props.image
  }

  let { currentUser } = getState();
  const id = currentUser.user.id;

  // if update includes an image, only then try posting to AWS
  if (updatedPost.image) {
    const formData = new FormData()
    const file = updatedPost.image[0]
    formData.append('file', file)

    return apiCall("post", `/api/users/${id}/images`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    // then, post the post to mongo, including the image url provided by AWS response
      .then(res => {
        const url = res.Location
        updatedPost.imageUrl = url
        return apiCall("patch", `/api/users/${props.userId}/posts/${props.postId}`, updatedPost)
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
    return apiCall("patch", `/api/users/${props.userId}/posts/${props.postId}`, updatedPost)
      .then(res => {
        dispatch(update(res));
      })
      .catch(err => {
        dispatch(addError(err.message))
      })
  }
}

export const fetchPosts = (userId) => {
  return dispatch => {
    return apiCall("get", `/api/users/${userId}/posts`)
      .then(res => {
        dispatch(loadPosts(res));
      })
      .catch(err => {
        dispatch(addError(err.message));
      });
  };
};

export const addNewPost = newPost => (dispatch, getState) => {
  let { currentUser } = getState();
  const id = currentUser.user.id;

  if (newPost.image) {
    const formData = new FormData()
    const file = newPost.image[0]
    formData.append('file', file)

    return apiCall("post", `/api/users/${id}/images`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(res => {
        const url = res.Location
        newPost.imageUrl = url
        return apiCall("post", `/api/users/${id}/posts`, newPost)
          .then(res => {
            dispatch(addPost(res[0]))
            return('success')
          })
          .catch(err => addError(err.post));
      })
      .catch(err => addError(err))
  }
  else {
    return apiCall("post", `/api/users/${id}/posts`, newPost)
      .then(res => {
        console.log("server res is", res)
        dispatch(addPost(res[0]))
        return('success')
      })
      .catch(err => addError(err.post));
  }
};
