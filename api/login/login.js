/* mock */
const Mock = require('mockjs');
const Random = Mock.Random;

/* faker */
const faker = require('faker');

/* data */
const login = {
    code: 0,
    msg: '登录成功.',
    token: 'token20171244',
    userinfo: {
        user: '龙Cloud',
        age: 20
    }
};

/* export */
module.exports = login;
