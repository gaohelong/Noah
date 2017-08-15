import React from 'react';
import { connect } from 'react-redux';

class Login extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { Config } = this.props;

        return (
            <div className={Config.prefixs.system + "login"}>Login</div>
        );
    }
}

export default Login;
