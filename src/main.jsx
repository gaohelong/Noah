/* react…… */
import React        from    'react';
import ReactDOM     from    'react-dom';
import { Provider } from    'react-redux';
import App          from    './router/router';
import store        from    './redux/Store/store';

/* sass */
import './sass/main';
import './sass/modules/admin/public';

/* store */
store.subscribe(() => { // 监听state变化.
    // console.log('getStore:', store.getState());
});

/* render */
let rootEle = document.getElementById('app');
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    rootEle
);
