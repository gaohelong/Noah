/* react…… */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './router/NoahRouter';
import store from './redux/Store/Store';

/* moment */
import moment from 'moment';
import 'moment/locale/zh-tw'; // 推荐在入口文件全局设置 locale.
moment.locale('zh-tw');

/* ant css */
import 'antd/dist/antd.css';

/* store */
store.subscribe(() => { // 监听state变化.
    console.group();
    console.time();
    console.log('getStore:', store.getState());
    console.timeEnd();
    console.groupEnd();
});

/* render */
let rootEle = document.getElementById('app');
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    rootEle
);
