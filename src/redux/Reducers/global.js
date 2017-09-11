import {
    PAGE_LOADING, PAGE_LOAD_SUCCESS, TOKEN_VERIFY_SUCCESS, TOKEN_VERIFY_FAIL
} from '../Actions/global';

const initState = {};

export const globalState = (state = initState, action) => {
    switch (action.type) {
        case PAGE_LOADING:
            return Object.assign({}, state, {
                pageLoading: true
            });
        case PAGE_LOAD_SUCCESS:
            return Object.assign({}, state, {
                pageLoading: false
            });
        case TOKEN_VERIFY_SUCCESS:
            return Object.assign({}, state, {
                token: true
            });
        case TOKEN_VERIFY_FAIL:
            return Object.assign({}, state, {
                token: false
            });
        default:
            return state;
    }
};
