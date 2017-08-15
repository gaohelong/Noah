import React from 'react';
import { connect } from 'react-redux';

class Login extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { Config } = this.props;

        return (
            <div className={Config.prefixs.system + "login"}>
                <div className="main">
                    <div className="logo">Noth System</div>
                </div>
                <div className="footer">©Noah System 2017</div>
            </div>
        );
    }
}

export default Login;
