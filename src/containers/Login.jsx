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

/* Login From */
import { Form, Icon, Input, Button, Checkbox } from 'antd';
const FormItem = Form.Item;
class LoginForm extends React.Component {
    loginHandle = (e) => {
        e.preventDefault();
        const { dispatch } = this.props;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                // console.log('Received values of form: ', values);
                dispatch(login(dispatch, '/login', {
                    user: values.username,
                    pwd: values.password
                }));
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const sysPre = this.props.sysPre;
        const inputCls = sysPre + 'input-base';

        return (
            <Form onSubmit={this.loginHandle}>
                <FormItem>
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: '请输入用户名!' }]
                    })(
                        <input type="text" className={inputCls} placeholder="Username" autoComplete="off" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: '请输入密码!' }]
                    })(
                        <input type="password" className={inputCls} placeholder="Password" autoComplete="off" />
                    )}
                </FormItem>
                <FormItem>
                    <button type="submit" className={sysPre + 'btn-base'} onClick={this.loginHandle}>Login</button>
                </FormItem>
            </Form>
        );
    }
}
const LoginFormComponent = Form.create()(LoginForm);

/* Login */
class Login extends React.Component {
    componentDidMount() {
    }

    componentWillReceiveProps(nextProps) {
        const { history } = this.props;

        // console.log(nextProps, this.props);
        if (nextProps.userinfo.user) {
            history.push('/main');
        }
    }

    render() {
        const { Config, dispatch } = this.props;
        const sysPre = Config.prefixs.system;

        return (
            <div className={sysPre + 'login'}>
                <div className="main">
                    <div className="logo">Noth System</div>
                    <div className="info">
                        <LoginFormComponent sysPre={sysPre} dispatch={dispatch} />
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
