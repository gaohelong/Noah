import { fetchPOST } from '../../api/fetch';
import { FETCH_REQUIRE_NO_DATA, FETCH_REQUIRE_FAIL } from './global';

export const LOGIN = 'LOGIN';
export const LOGIN_REMEMBER_ME = 'LOGIN_REMEMBER_ME';

export const login = (dispatch, url, data) => {
    return () => {
        fetchPOST(url, data)
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                if (json.code === 0) { // 登录成功.
                    dispatch({
                        type: LOGIN,
                        data: {
                            token: json.token,
                            userinfo: json.userinfo
                        }
                    });
                } else { // 登录失败.
                    dispatch({
                        type: FETCH_REQUIRE_NO_DATA,
                        data: {
                            msg: json.msg
                        }
                    });
                }
            })
            .catch(function(ex) { // 请求失败.
                dispatch({
                    type: FETCH_REQUIRE_FAIL,
                    data: {
                        msg: 'parsing failed:' + ex
                    }
                });
            });
    };
};

export const loginRememberMe = () => {
    return {
        type: LOGIN_REMEMBER_ME
    };
};
