/* import data */
const login = require('./login/login');
const tokenVerify = require('./login/tokenVerify');
const pageExp1List = require('./page/example1');
const pageExp1Del = require('./page/exp1Del');
const logout = require('./login/logout');

/* data */
let data = {
    login,
    pageExp1List,
    tokenVerify,
    pageExp1Del,
    logout
};

/* export */
module.exports = () => {
    return data;
};
