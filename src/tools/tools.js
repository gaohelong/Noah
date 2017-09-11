// fetch get url proc.
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
