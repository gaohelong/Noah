/* import data */
const login = require('./login/login');
const pageExp1List = require('./page/example1');

/* data */
let data = {
    login,
    pageExp1List
};

/* export */
module.exports = () => {
    return data;
};
