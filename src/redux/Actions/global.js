export const FETCH_REQUIRE_NO_DATA = 'FETCH_REQUIRE_NO_DATA'; // 无匹配的数据.
export const FETCH_REQUIRE_FAIL = 'FETCH_REQUIRE_FAIL'; // 获取失败.

/* 分页 */
export const PAGE_LOADING = 'PAGE_LOADING';
export const PAGE_LOAD_SUCCESS = 'PAGE_LOAD_SUCCESS';

export const pageLoading = () => {
    return {
        type: PAGE_LOADING
    };
};

export const pageLoadSuccess = () => {
    return {
        type: PAGE_LOAD_SUCCESS
    };
};

/* token */
export const TOKEN_VERIFY_SUCCESS = 'TOKEN_VERIFY_SUCCESS';
export const TOKEN_VERIFY_FAIL = 'TOKEN_VERIFY_FAIL';
export const tokenVerifySuccess = () => {
    return {
        type: TOKEN_VERIFY_SUCCESS
    };
};

export const tokenVerifyFail = () => {
    return {
        type: TOKEN_VERIFY_FAIL
    };
};

/* 操作loading */
export const GLOBAL_OPERATION_LOADING_OPEN = 'GLOBAL_OPERATION_LOADING_OPEN';
export const GLOBAL_OPERATION_LOADING_CLOSE = 'GLOBAL_OPERATION_LOADING_CLOSE';
export const globalOperationLoadingOpen = () => {
    return {
        type: GLOBAL_OPERATION_LOADING_OPEN
    };
};

export const globalOperationLoadingClose = () => {
    return {
        type: GLOBAL_OPERATION_LOADING_CLOSE
    };
};
