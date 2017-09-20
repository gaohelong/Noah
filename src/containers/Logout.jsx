import React from 'react';
import { connect } from 'react-redux';

/* antd */
import { message } from 'antd';

/* action */
import { logout } from '../redux/Actions/login';

class Logout extends React.Component {
    componentDidMount() {
        const { dispatch, Config } = this.props;
        dispatch(logout(dispatch, Config.logoutPath));
    }

    componentWillReceiveProps(nextProps) {
        const { history, Config } = this.props;
        const msgAlertTime = Config.times.msgAlertTime;
        if (nextProps.logout === true) {
            message.success(nextProps.logoutMsg, msgAlertTime, () => {
                history.push('/');
            });

            return '';
        }

        if (nextProps.logoutMsg) {
            message.error(nextProps.logoutMsg, msgAlertTime, () => {
                history.push('/main');
            });

            return '';
        }
    }

    render() {
        return (
            <div>Logout</div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        logout: state.loginState.logout,
        logoutMsg: state.loginState.logoutMsg,
        renderTime: state.loginState.renderTime
    };
};

export default connect(mapStateToProps)(Logout);
