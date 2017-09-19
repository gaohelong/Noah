/* fetch get url proc */
export const url = (host, url, data) => {
    let resUrl = '';

    if (url.indexOf('http') === -1) {
        resUrl = host + url + '?' + urlParamsProc(data);
    } else {
        resUrl = url + '?' + urlParamsProc(data);
    }

    return resUrl;
};

const urlParamsProc = (data) => {
    let res = '';
    let k = '';

    for (k in data) {
        res += k + '=' + data[k] + '&';
    }

    return res;
};

/* localStorage */
export const getLocalStorageItem = (key) => {
    if (!localStorage) {
        return '';
    }

    return localStorage.getItem(key);
};

export const getLocalStorageObjItem = (key) => {
    if (!localStorage) {
        return '';
    }

    return JSON.parse(localStorage.getItem(key));
};

export const setLocalStorageItem = (key, val) => {
    if (!localStorage) {
        return '';
    }

    localStorage.setItem(key, val);
};

export const removeLocalStorageItem = (key) => {
    if (!localStorage) {
        return '';
    }

    localStorage.removeItem(key);
};

export const clearLocalStorage = () => {
    if (!localStorage) {
        return '';
    }

    localStorage.clear();
};
