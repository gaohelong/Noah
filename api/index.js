/* import data */
const login = require('./login/login');
const tokenVerify = require('./login/tokenVerify');
const pageExp1List = require('./page/example1');

/* data */
let data = {
    login,
    pageExp1List,
    tokenVerify
};

/* export */
module.exports = () => {
    return data;
};
