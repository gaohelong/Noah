import { fetchPOST } from '../../api/fetch';
import { FETCH_REQUIRE_NO_DATA, FETCH_REQUIRE_FAIL } from './global';
import { setLocalStorageItem } from '../../tools/tools';

export const LOGIN = 'LOGIN';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const LOGIN_REMEMBER_ME = 'LOGIN_REMEMBER_ME';

export const login = (dispatch, url, data) => {
    return () => {
        fetchPOST(url, data)
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                console.clear();

                if (json.code === 0) { // 登录成功.
                    // localStorage.
                    setLocalStorageItem('token', json.token);
                    setLocalStorageItem('userinfo', JSON.stringify(json.userinfo));

                    dispatch({
                        type: LOGIN
                        // data: {
                        //     token: json.token,
                        //     userinfo: json.userinfo
                        // }
                    });
                } else { // 登录失败.
                    dispatch({
                        type: LOGIN_FAIL,
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
