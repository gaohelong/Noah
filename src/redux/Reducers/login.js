import { LOGIN, LOGIN_FAIL, LOGIN_REMEMBER_ME } from '../Actions/';

/* init state */
const initState = {};

/* export function */
export const loginState = (state = initState, action) => {
    switch (action.type) {
        case LOGIN:
            return Object.assign({}, state, {
                state: true,
                stateTime: new Date().getTime(),
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
