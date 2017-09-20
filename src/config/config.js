const Config = {
    prefixs: {
        system: 'noah-'
    },
    fetchUrl: {
        prod: 'http://hl.react-noah.com',
        dev: 'http://localhost:8002'
    },
    tokenVerifyUrl: {
        prod: 'http://hl.react-noah.com/tokenVerify',
        dev: 'http://localhost:8002/tokenVerify'
    },
    times: {
        loadingTime: 2000,
        logoutLoadingTime: 600000,
        msgAlertTime: 3
    },
    logoutPath: '/logout'
};

export default Config;
