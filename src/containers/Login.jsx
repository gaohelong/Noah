import React from 'react';
import { connect } from 'react-redux';

/* moment */
// import moment from 'moment';

/* ant */
// import { DatePicker } from 'antd';
// let style = {
//     'marginTop': '20px'
// };
// <DatePicker style={style} className="datapicker" defaultValue={moment('2015-01-01', 'YYYY-MM-DD')} />

/* action */
import { login } from '../redux/Actions/login';

class Login extends React.Component {
    constructor(props) {
        super(props);

        // func.
        this.loginHandle = this.loginHandle.bind(this);
    }

    componentDidMount() {
    }

    componentWillReceiveProps(nextProps) {
        const { history } = this.props;

        // console.log(nextProps, this.props);
        if (nextProps.userinfo.user) {
            history.push('/main');
        }
    }

    loginHandle() {
        const { dispatch } = this.props;
        dispatch(login(dispatch, '/login', {
            user: this.userEle.value,
            pwd: this.pwdEle.value
        }));
    }

    render() {
        const { Config } = this.props;
        const sysPre = Config.prefixs.system;
        let inputCls = sysPre + 'input-base';

        return (
            <div className={sysPre + 'login'}>
                <div className="main">
                    <div className="logo">Noth System</div>
                    <div className="info">
                        <input type="text" className={inputCls} id="username" ref={(input) => (this.userEle = input)} placeholder="Username" autoComplete="off" />
                        <input type="password" className={inputCls} id="password" ref={(input) => (this.pwdEle = input)} placeholder="Password" autoComplete="off" />
                        <button type="button" className={sysPre + 'btn-base'} onClick={this.loginHandle}>Login</button>
                    </div>
                </div>
                <div className="footer">©Noah System 2017</div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userinfo: state.loginState.userinfo
    };
};

export default connect(mapStateToProps)(Login);
