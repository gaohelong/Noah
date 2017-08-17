import React from 'react';
import { connect } from 'react-redux';

class Login extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { Config } = this.props;
        const sysPre = Config.prefixs.system;
        let inputCls = sysPre + "input-base";

        return (
            <div className={sysPre + "login"}>
                <div className="main">
                    <div className="logo">Noth System</div>
                    <div className="info">
                        <input type="text" className={inputCls} id="username" placeholder="Username" />
                        <input type="password" className={inputCls} id="password" placeholder="Password" />
                        <button type="button" className={sysPre + "btn-base"}>Login</button>
                    </div>
                </div>
                <div className="footer">©Noah System 2017</div>
            </div>
        );
    }
}

export default Login;
