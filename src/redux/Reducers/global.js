import {
    PAGE_LOADING, PAGE_LOAD_SUCCESS, TOKEN_VERIFY_SUCCESS, TOKEN_VERIFY_FAIL,
    GLOBAL_OPERATION_LOADING_OPEN, GLOBAL_OPERATION_LOADING_CLOSE
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
                token: true,
                tokenTime: new Date().getTime()
            });
        case TOKEN_VERIFY_FAIL:
            return Object.assign({}, state, {
                token: false,
                tokenTime: new Date().getTime()
            });
        case GLOBAL_OPERATION_LOADING_OPEN:
            return Object.assign({}, state, {
                operationLoading: true
            });
        case GLOBAL_OPERATION_LOADING_CLOSE:
            return Object.assign({}, state, {
                operationLoading: false
            });
        default:
            return state;
    }
};
