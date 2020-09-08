import { SET_CURRENT_USER } from '../actions/types';
import isEmpty from '../vaildation/is-empty';

const initialState = {
    isAuthenticated: false,
    user: {}
}

export default function (stat = initialState, action) {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),// check the returned TOKEN
                user: action.payload
            }
            default:
                return state;
    }
}