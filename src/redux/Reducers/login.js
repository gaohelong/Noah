import { LOGIN, LOGIN_FAIL, LOGIN_REMEMBER_ME } from '../Actions/';

/* init state */
const initState = {};

/* export function */
export const loginState = (state = initState, action) => {
    switch (action.type) {
        case LOGIN:
            return Object.assign({}, state, {
                token: action.data.token,
                userinfo: action.data.userinfo,
                rememberMe: !state.rememberMe,
                failMsg: '',
                failMsgTime: 0
            });
        case LOGIN_FAIL:
            return Object.assign({}, state, {
                failMsg: action.data.msg,
                failMsgTime: new Date().getTime()
            });
        default:
            return state;
    }
};
