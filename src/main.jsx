/* react…… */
import React        from    'react';
import ReactDOM     from    'react-dom';
import { Provider } from    'react-redux';
import App          from    './router/NoahRouter';
import store        from    './redux/Store/Store';

/* store */
store.subscribe(() => { // 监听state变化.
    console.log('getStore:', store.getState());
});

/* render */
let rootEle = document.getElementById('app');
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    rootEle
);
