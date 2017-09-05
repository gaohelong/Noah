// fetch get url proc.
export const url = (host, url, data) => {
    return host + url + '?' + urlParamsProc(data);
};

const urlParamsProc = (data) => {
    let res = '';
    let k = '';

    for (k in data) {
        res += k + '=' + data[k] + '&';
    }

    return res;
};
