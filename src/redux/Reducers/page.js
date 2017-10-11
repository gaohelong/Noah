import {
    PAGE_EXP1_LIST, PAGE_EXP1_DEL_SUCCESS, PAGE_EXP1_DEL_FAIL, PAGE_EXP1_DETAIL_INFO, PAGE_EXP1_DETAIL_INFO_EMPTY,
    PAGE_EXP1_ADD_SAVE
} from '../Actions/page';

const initState = {};

export const pageState = (state = initState, action) => {
    switch (action.type) {
        case PAGE_EXP1_LIST:
            /* 写法1
            return Object.assign({}, state, {
                exp1List: {
                    // loading: action.data.loading,
                    list: action.data.list,
                    curPage: action.data.curPage,
                    total: action.data.total
                }
            }); */

            /* 写法2 */
            let _state = state;
            _state.exp1List = {
                // loading: action.data.loading,
                list: action.data.list,
                curPage: action.data.curPage,
                total: action.data.total
            };
            return _state;
        case PAGE_EXP1_DEL_SUCCESS:
            return Object.assign({}, state, {
                delInfo: {
                    key: action.data.key,
                    msg: action.data.msg,
                    curPage: action.data.curPage,
                    type: 'success',
                    delInfoTime: new Date().getTime()
                }
            });
        case PAGE_EXP1_DEL_FAIL:
            return Object.assign({}, state, {
                delInfo: {
                    key: action.data.key,
                    msg: action.data.msg,
                    curPage: action.data.curPage,
                    type: 'fail',
                    delInfoTime: new Date().getTime()
                }
            });
        case PAGE_EXP1_DETAIL_INFO:
            return Object.assign({}, state, {
                detailInfo: action.detailInfo
            });
        case PAGE_EXP1_DETAIL_INFO_EMPTY:
            return Object.assign({}, state, {
                detailInfo: {}
            });
        case PAGE_EXP1_ADD_SAVE:
            return Object.assign({}, state, {
                addMsg: action.data.msg,
                renderTime: new Date().getTime()
            });
        default:
            return state;
    }
};
