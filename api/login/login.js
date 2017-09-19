/* mock */
const Mock = require('mockjs');
const Random = Mock.Random;

/* faker */
const faker = require('faker');

/* data */
const login = {
    code: 0,
    msg: '登录成功.',
    token: 'api-get:token20171244',
    userinfo: {
        name: 'Fate Saber',
        age: 20
    }
};

/* export */
module.exports = login;
