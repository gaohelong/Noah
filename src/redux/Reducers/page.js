import { PAGE_EXP1_LIST } from '../Actions/page';

const initState = {};

export const pageState = (state = initState, action) => {
    switch (action.type) {
        case PAGE_EXP1_LIST:
            return Object.assign({}, state, {
                exp1List: {
                    loading: action.data.loading,
                    list: action.data.list,
                    curPage: action.data.curPage,
                    total: action.data.total
                }
            });
        default:
            return state;
    }
};
