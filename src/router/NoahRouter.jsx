/* react */
import React from 'react';

/* react-router */
import {
    BrowserRouter as Router,
    Redirect,
    Route,
    Link,
    Switch
} from 'react-router-dom';

/* config */
import Config from '../config/config';

/* Bundle */
import Bundle from './Bundle';

/* lazy container */
import loadLogin from 'bundle-loader?lazy!../containers/Login';
import loadMain from 'bundle-loader?lazy!../containers/Main';
import loadPagination from 'bundle-loader?lazy!../containers/Pagination';
import loadF404 from 'bundle-loader?lazy!../containers/404/404';

/* layout */
import Layout from '../components/Layout/Layout';

/* sass */
import '../sass/main';

/* autoload module */
const Login = (props) => {
    require('../sass/modules/login/login');
    // document.title = 'Noah System';

    return (
        <Bundle load={loadLogin}>
            {(Login) => <Login {...props} Config={Config} />}
        </Bundle>
    );
};

const Main = (props) => {
    return (
        <Bundle load={loadMain}>
            {(Main) => <Main {...props} />}
        </Bundle>
    );
};

const Pagination = (props) => {
    return (
        <Bundle load={loadPagination}>
            {(Pagination) => <Pagination {...props} />}
        </Bundle>
    );
};

const F404 = (props) => {
    require('../sass/modules/404/404');

    return (
        <Bundle load={loadF404}>
            {(F404) => <F404 {...props} />}
        </Bundle>
    );
};

/* router config */
const routerConfig = [
    {
        exact: true,
        path: '/',
        component: Login,
        type: 1
    },
    {
        path: '/main',
        selVal: '1',
        component: Main,
        breadcrumb: 'Home/main',
        type: 2
    },
    {
        path: '/pagination',
        selVal: '2',
        component: Pagination,
        breadcrumb: '分页管理/pagination',
        type: 2
    },
    {
        component: F404,
        type: 1
    }
];

const RouteCreate = (route) => {
    if (route.type === 1) {
        return <Route path={route.path} exact={route.exact} component={route.component} />;
    } else {
        return (
            <Route path={route.path} exact={route.exact} render={(props) => (
                <Layout {...props} selVal={route.selVal} breadcrumb={route.breadcrumb}>
                    <route.component {...props} />
                </Layout>
            )} />
        );
    }
};

class NoahRouter extends React.Component {
    render() {
        return (
            <Router>
                <Switch>
                    {
                        routerConfig.map((route, i) => (
                            <RouteCreate key="routerCreate" {...route} />
                        ))
                    }
                </Switch>
            </Router>
        );
    }
}

export default NoahRouter;
