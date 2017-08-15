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
import loadLogin    from    'bundle-loader?lazy!../containers/Login';
import loadF404     from    'bundle-loader?lazy!../containers/404/404';

/* layout */
// import Layout   from    '../components/Layout/Layout';

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

const F404 = (props) => {
    require('../sass/modules/404/404');

    return (
        <Bundle load={loadF404}>
            {(F404) => <F404 {...props} Config={Config} />}
        </Bundle>
    );
};

class NoahRouter extends React.Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/" component={Login} />
                    <Route component={F404} />
                </Switch>
            </Router>
        );
    }
}

export default NoahRouter;
