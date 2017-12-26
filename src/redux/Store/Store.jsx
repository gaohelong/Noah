import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import * as reducer from '../Reducers/index';
import thunk from 'redux-thunk';

const store = createStore(
    combineReducers(reducer),
    // applyMiddleware(thunk),
    compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
);

export default store;
