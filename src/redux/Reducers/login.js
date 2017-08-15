import { LOGIN, LOGIN_REMEMBER_ME } from '../Actions/';

/* init state */
const initState = {
    rememberMe: false
};

/* export function */
export const loginState = (state = initState, action) => {
    switch(action.type) {
        case LOGIN:
            return Object.assign({}, state, {
                rememberMe: !state.rememberMe
            });
        default:
            return state;
    }
};
