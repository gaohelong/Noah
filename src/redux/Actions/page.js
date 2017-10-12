/* import */
import { fetchPOST } from '../../api/fetch';
import {
    FETCH_REQUIRE_NO_DATA, FETCH_REQUIRE_FAIL, PAGE_LOAD_SUCCESS,
    GLOBAL_OPERATION_LOADING_CLOSE
} from './global';

/* export */
export const PAGE_EXP1_LIST = 'PAGE_EXP1_LIST';

export const PAGE_EXP1_DEL_SUCCESS = 'PAGE_EXP1_DEL_SUCCESS';
export const PAGE_EXP1_DEL_FAIL = 'PAGE_EXP1_DEL_FAIL';

export const PAGE_EXP1_DETAIL_INFO = 'PAGE_EXP1_DETAIL_INFO';
export const PAGE_EXP1_DETAIL_INFO_EMPTY = 'PAGE_EXP1_DETAIL_INFO_EMPTY';

export const PAGE_EXP1_ADD_SAVE = 'PAGE_EXP1_ADD_SAVE';

// 获取列表.
export const pageExp1List = (dispatch, url, data = {page: 1}, callback) => {
    return () => {
        fetchPOST(url, data)
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                console.group();
                console.time();
                console.log('page-async');

                if (json.code === 0) {
                    dispatch({
                        type: PAGE_EXP1_LIST,
                        data: {
                            list: json.list,
                            total: json.total,
                            curPage: data.page
                        }
                    });
                } else {
                    dispatch({
                        type: FETCH_REQUIRE_NO_DATA,
                        data: {
                            msg: json.msg
                        }
                    });
                }

                dispatch({
                    type: GLOBAL_OPERATION_LOADING_CLOSE
                });

                if (typeof callback === 'function') {
                    callback();
                }

                console.timeEnd();
                console.groupEnd();
            })
            .catch((error) => {
                dispatch({
                    type: FETCH_REQUIRE_FAIL,
                    data: {
                        msg: 'parsing failed:' + error
                    }
                });
            });
    };
};

// 删除.
export const pageExp1Del = (dispatch, url, data = {}) => {
    return () => {
        fetchPOST(url, data)
            .then(response => response.json())
            .then(json => {
                if (json.code === 0) { // 删除成功.
                    dispatch({
                        type: PAGE_EXP1_DEL_SUCCESS,
                        data: {
                            key: data.id,
                            curPage: data.curPage,
                            msg: json.msg
                        }
                    });
                } else { // 删除失败.
                    dispatch({
                        type: PAGE_EXP1_DEL_FAIL,
                        data: {
                            key: data.id,
                            curPage: data.curPage,
                            msg: json.msg
                        }
                    });
                }
            })
            .catch(error => {
                dispatch({
                    type: FETCH_REQUIRE_FAIL,
                    data: {
                        msg: 'parsing failed:' + error
                    }
                });
            });
    };
};

// 查看.
export const pageDetailInfo = (detailInfo) => {
    return {
        type: PAGE_EXP1_DETAIL_INFO,
        detailInfo: detailInfo
    };
};

// 清除查看数据.
export const pageDetailInfoEmpty = () => {
    return {
        type: PAGE_EXP1_DETAIL_INFO_EMPTY
    };
};

// 添加保存.
export const exp1AddSave = (dispatch, url, data = {}) => {
    return () => {
        fetchPOST(url, data)
            .then(response => response.json())
            .then(json => {
                if (json.code === 0) {
                    dispatch({
                        type: PAGE_EXP1_ADD_SAVE,
                        data: {
                            msg: json.msg
                        }
                    });
                    // dispatch({
                    //     type: GLOBAL_OPERATION_LOADING_CLOSE
                    // });
                } else {
                    dispatch({
                        type: FETCH_REQUIRE_NO_DATA,
                        data: {
                            msg: json.msg
                        }
                    });
                }
            })
            .catch(error => {
                dispatch({
                    type: FETCH_REQUIRE_FAIL,
                    data: {
                        msg: 'parsing failed:' + error
                    }
                });
            });
    };
};
