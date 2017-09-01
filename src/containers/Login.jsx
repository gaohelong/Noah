import React from 'react';
import { connect } from 'react-redux';

/* moment */
import moment from 'moment';

/* ant */
import { DatePicker } from 'antd';

class Login extends React.Component {
    render() {
        const { Config } = this.props;
        const sysPre = Config.prefixs.system;
        let inputCls = sysPre + 'input-base';
        let style = {
            'marginTop': '20px'
        };

        return (
            <div className={sysPre + 'login'}>
                <div className="main">
                    <div className="logo">Noth System</div>
                    <div className="info">
                        <input type="text" className={inputCls} id="username" placeholder="Username" />
                        <input type="password" className={inputCls} id="password" placeholder="Password" />
                        <button type="button" className={sysPre + 'btn-base'}>Login</button>
                        <DatePicker style={style} className="datapicker" defaultValue={moment('2015-01-01', 'YYYY-MM-DD')} />
                    </div>
                </div>
                <div className="footer">©Noah System 2017</div>
            </div>
        );
    }
}

export default Login;
