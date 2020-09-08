import { ADD_POST, GET_POSTS, GET_POST, DELETE_POST, POST_LOADDING, GET_ERRORS } from './types';
import axios from 'axios';
// add comments
export const addPost = postData => dispatch => {
  axios.post("/api/posts", postData)
    .then(res => 
      dispatch({
        type: ADD_POST,
        payload: res.data
      }))
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        }))
}
// require content of comments
export const getPosts = () => dispatch => {
  dispatch(setPostLoading);
  axios.get("/api/posts")
    .then(res =>
      dispatch({
        type: GET_POSTS,
        payload: res.data
      }))
      .catch(err => 
        dispatch({
          type: GET_POSTS,
          payload: null
        }))
}
// delete single comment
export const deletePost = (id) => dispatch => {
  axios.delete(`/api/post/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_POST,
        payload: id
      }))
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        }))
}
// Like
export const addLike = (id) => dispatch => {
  axios.post(`/apo/posts/like/${id}`)
    .then(res =>
      window.location.reload()
      )
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        }))
}
// Cancel Like
export const removeLike = (id) => dispatch => {
  axios.post(`/api/posts/unlike/${id}`)
    .then(res =>
      window.location.reload()
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      }))
}
// Require users' info who leave encpuraging comments
export const getPost = (id) => dispatch => {
  dispatch(setPostLoading);
  axios.get(`/api/posts/${id}`)
    .then(res =>
      dispatch({
        type: GET_POST,
        payload: res.data
      }))
      .catch(err =>
        dispatch({
          type: GET_POST,
          payload: null
        }))
}