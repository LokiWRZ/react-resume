import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { GET_ERRORS, SET_CURRENT_USER } from './types';
import setAuthToken from '../utils/setAuthToken';
//register
export const registerUser = (userData, history) => dispatch => {
    axios.post('/api/users/register',userData).then(res => {
        //route jump
        history.push('/login')
    }).catch(err => {
        console.log(err);

        dispatch(
            { type: GET_ERRORS, payload: err.response.data }
        )
    })
}
//Login
export const loginUser = (userData) => dispatch =>{
    axios.post('/api/users/login',userData).then(res => {
        let { token } = res.data;
        localStorage.setItem('jwtToken',token)
        // set Token to header
        setAuthToken(token)
        // decode Token
        const decoded = jwt_decode(token)
        dispatch(setCurrentUser(decoded))

    }).catch(err => dispatch(
        { type: GET_ERRORS, payload: err.response.data }
    ))
}

// return deceded token, then submit to redux
export const setCurrentUser = (decoded) => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}

// logout 
export const logoutUser = () => dispatch => {
    localStorage.removeItem('jwtToken')
    // clear information of header
    setAuthToken(false)
    // dispatch to reducer 
    dispatch(setCurrentUser({}))
}