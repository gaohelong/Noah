import { PAGE_LOADING, PAGE_LOAD_SUCCESS } from '../Actions/global';

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
        default:
            return state;
    }
};
