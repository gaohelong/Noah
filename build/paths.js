var path = require('path');
var ROOT_PATH = path.resolve(__dirname, '../');

var WWW_RUL = '';
if (process.env.NODE_ENV == 'production') {
    WWW_URL = 'http://react.noah.com/';
} else {
    WWW_URL = 'http://localhost:8001/';    
}

module.exports = {
    WWW_URL: WWW_URL,
    ROOT_PATH: ROOT_PATH,
    SRC_PATH: path.resolve(ROOT_PATH, 'src'),
    DIST_PATH: path.resolve(ROOT_PATH, 'dist')
};
