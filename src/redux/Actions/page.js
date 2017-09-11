/* import */
import { fetchPOST } from '../../api/fetch';
import { FETCH_REQUIRE_NO_DATA, FETCH_REQUIRE_FAIL, PAGE_LOAD_SUCCESS } from './global';

/* export */
export const PAGE_EXP1_LIST = 'PAGE_EXP1_LIST';

export const pageExp1List = (dispatch, url, data = {page: 1}) => {
    return () => {
        fetchPOST(url, data)
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                if (json.code === 0) {
                    dispatch({
                        type: PAGE_EXP1_LIST,
                        data: {
                            list: json.list,
                            total: json.total,
                            curPage: data.page
                        }
                    });

                    dispatch({
                        type: PAGE_LOAD_SUCCESS
                    });
                } else {
                    dispatch({
                        type: FETCH_REQUIRE_NO_DATA,
                        data: {
                            msg: json.msg
                        }
                    });
                }
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
