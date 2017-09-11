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
// import loadList from 'bundle-loader?lazy!../containers/List/List';
import loadListExample1 from 'bundle-loader?lazy!../containers/List/Example1';
import loadListExample2 from 'bundle-loader?lazy!../containers/List/Example2';
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
            {(Login) => <Login {...props} loginSpecialProps="special" Config={Config} />}
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

// const List = (props) => {
//     return (
//         <Bundle load={loadList}>
//             {(List) => <List {...props} />}
//         </Bundle>
//     );
// };

const ListExample1 = (props) => {
    return (
        <Bundle load={loadListExample1}>
            {(ListExample1) => <ListExample1 {...props} />}
        </Bundle>
    );
};

const ListExample2 = (props) => {
    return (
        <Bundle load={loadListExample2}>
            {(ListExample2) => <ListExample2 {...props} />}
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
        component: Main,
        type: 2,
        toProps: {
            selVal: '1',
            breadcrumb: 'Home~main'
        }
    },
    // {
    //     path: '/list',
    //     selVal: '2',
    //     component: List,
    //     breadcrumb: '列表实例/list',
    //     type: 2
    //     routes: [
    //         {
    //             path: '/list/exp1',
    //             component: ListExample1
    //         },
    //         {
    //             path: '/list/exp2',
    //             component: ListExample2
    //         }
    //     ]
    // },
    {
        exact: true,
        path: '/list/exp1',
        component: ListExample1,
        type: 2,
        toProps: {
            selVal: '2',
            breadcrumb: '列表实例~main|列表实例1~list/exp1',
            menuDefOpenKeys: 'list'
        }
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
        // 将自定义的Config属性注入到路由的组件中.
        return (
            <Route path={route.path} exact={route.exact} render={(props) => (
                <Layout {...props} {...route.toProps} Config={Config}>
                    <route.component {...props} Config={Config} />
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
