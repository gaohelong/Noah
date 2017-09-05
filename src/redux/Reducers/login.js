import { LOGIN, LOGIN_REMEMBER_ME } from '../Actions/';

/* init state */
const initState = {
    token: '',
    userinfo: {},
    rememberMe: false
};

/* export function */
export const loginState = (state = initState, action) => {
    switch (action.type) {
        case LOGIN:
            return Object.assign({}, state, {
                token: action.data.token,
                userinfo: action.data.userinfo,
                rememberMe: !state.rememberMe
            });
        default:
            return state;
    }
};
