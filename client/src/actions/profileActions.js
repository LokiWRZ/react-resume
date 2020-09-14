import axios from 'axios';
import { SET_CURRENT_USER, GET_PROFILE, GET_PROFILES, PROFILE_LOADING, CLEAR_CURRENT_PROFILE, GET_ERRORS } from './types';

//User indivadual information data
export const getCurrentProfile = () => dispatch => {
  //load animation
  dispatch(setProfileLoading())
  // require logined user's personal information data
  axios('/api/profile').then(res => {
    //return data after required successful
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    })
  }).catch(err => {
    dispatch({
      type: GET_PROFILE,
      payload: {}
    })
  })
}

// get information of all developers
export const getProfiles = () => dispatch => {
  //load animation
  dispatch(setProfileLoading())
  //require information data of all developers
  axios('/api/profile/all').then(res => {
    //return data after require successful
    dispatch({
      type: GET_PROFILES,
      payload: res.data
    })
  }).catch(err => {
    dispatch({
      type:GET_PROFILES,
      payload: null
    })
  })
}

//loading animation
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  }
}
//clear user's info
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  }
}

//create personal info
export const createProfile = (profileData, history) => dispatch => {
  //load animation
  dispatch(setProfileLoading())
  axios.post("/api/profile", profileData)
    .then(res => {
      console.log('profileData', profileData);
      history.push("/dashboard")
    })
    .catch(err => {
      console.log(err)
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    })
}
// delete account
export const deleteAccout = (params) => dispatch => {
  // load animation
  dispatch(setProfileLoading())
  axios.delete("/api/profile")
    .then(res =>
      dispatch({
        type: SET_CURRENT_USER,
        payload: {}
      }))
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        }))
}

// add personal experience
export const addExperience = (expData, history) => dispatch =>{
  //loading animation
  dispatch(setProfileLoading())
  axios.post("/api/profile/experience", expData)
    .then(res => history.push("/dashboard"))
      .catch(err => 
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      )
}

// add education experience
export const addEducation = (expData, history) => dispatch => {
  axios.post("/api/profile/education", expData)
    .then(res => history.push("/dashboard"))
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
        )
}

// delete education
export const deleteEducation = id => dispatch => {
  // loading animation
  dispatch(setProfileLoading())
  axios.delete(`/api/profile/education/${id}`)
    .then(res => 
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err => 
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      }))
}

//delete personal experience
export const deleteExperience = id => dispatch => {
  //loading animation
  dispatch(setProfileLoading())
  axios.delete(`/api/profile/experience/${id}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      }))
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        }))
}

// get more info about developers based on dynamic router 'handle'
export const getProfileByHandle = handle => dispatch => {
  //load animation
  dispatch(setProfileLoading())
  axios(`/api/profile/handle/${handle}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      }))
      .catch(err =>
        dispatch({
          type: GET_PROFILE,
          payload: null
        }))
}