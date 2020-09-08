import { GET_PROFILE, GET_PROFILES, PROFILE_LOADING, CLEAR_CURRENT_PROFILE } from './actions/types';

const initialState = {
  profile: null, //personal info
  profiles: null, // multi info
  loading: false, // loading animation
}

export default function (state = initialState, action) {
  switch (action.type) {
    case PROFILE_LOADING: //loading animation
      return {
        ...state,
        loading: true
      }
    case GET_PROFILE: //users' info
      return {
        ...state,
        profile: action.payload,
        loading: false
      }
    case GET_PROFILES: //developers' info
      return {
        ...state,
        profiles: action.payload,
        loading: false
      }
    case CLEAR_CURRENT_PROFILE: // clear users' info
      return {
        ...state,
        profiles: null,
        loading: false
      }
    default:
      return {
        ...state,
        loading: false
      };
  }
}