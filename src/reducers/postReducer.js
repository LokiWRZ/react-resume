import { ADD_POST, GET_POSTS, GET_POST, DELETE_POST, POST_LOADDING } from '../actions/types';

const initialState = {
  posts: [], // multi comments
  post: {}, // single comment
  loading: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case POST_LOADDING:
      return {
        ...state,
        loading: true
      }
    case GET_POSTS: //require the content of comment
      return {
        ...state,
        posts: action.payload,
        loading: false
      }
    case GET_POST: // require encouraging comment
     return {
       ...state,
       post: action.payload,
       loading: false
     }
    case ADD_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts]
      }
    case DELETE_POST: // delete single comment
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== action.payload) // filter unequal id, delete id which has been clicked id button
      }
    default:
      return state;
  }
}