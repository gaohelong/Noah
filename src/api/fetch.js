import Config from '../config/config'; // config.
import * as Tools from '../tools/tools'; // tools.

const host = process.env.NODE_ENV === 'production' ? Config.fetchUrl.prod : Config.fetchUrl.dev;

/* fetchGet: dev->fetchPost; prod->fetchGet. */
export const fetchPOST = (url, data) => {
    url = Tools.url(host, url, data);

    return fetch(url, {
        method: 'get'
    });
};
