import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Layout, Icon, Spin } from 'antd';
const { Header, Sider, Content } = Layout;

/* Noah Compoent */
import NoahBreadcrumb from './Breadcrumb';
import NoahSubMenu from './SubMenu';

/* fetch */
import { fetchPOST } from '../../api/fetch';

/* action */
import { tokenVerifySuccess, tokenVerifyFail } from '../../redux/Actions/global';

/* component */
import OperationLoading from '../Loading/OperationLoading';

class NoahLayout extends React.Component {
    constructor(props) {
        super(props);

        // state.
        this.state = {
            collapsed: false,
            initLoading: true
        };

        // token verify.
        let { Config, history, dispatch } = this.props;
        let url = process.env.NODE_ENV === 'production' ? Config.tokenVerifyUrl.prod : Config.tokenVerifyUrl.dev;
        const verify = async () => {
            console.group();
            console.time();
            console.log('token verify begin');

            // fetchPOST(url)
            await fetchPOST(url)
                .then(response => response.json())
                .then(json => {
                    if (json.code !== 0) { // token失效.
                        dispatch(tokenVerifyFail());
                    } else {
                        dispatch(tokenVerifySuccess());
                    }
                })
                .catch(error => {
                    console.log(error);
                });

            console.log('token verify end');
            console.timeEnd();
            console.groupEnd();
        };

        verify();
    }

    // state = {
    //     collapsed: false
    // };

    onCollapse = (collapsed) => {
        this.setState({ collapsed });
    }

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

    loadingClose = (nextProps) => {
        const { Config } = this.props;
        let loadingTime = Config.times.loadingTime;
        if (nextProps.match.path === '/logout') {
            loadingTime = Config.times.logoutLoadingTime;
        }

        // toggle page loading定时器.
        clearTimeout(this.setTimeClear);
        this.setTimeClear = setTimeout(() => {
            clearTimeout(this.setTimeClear);
            this.setState({initLoading: false});
        }, loadingTime);
    };

    componentWillReceiveProps(nextProps) {
        // console.log(nextProps, this.props);
        const { Config } = this.props;

        // token verify.
        if (!nextProps.token) {
            let { history } = this.props;
            history.push('/');
        }

        /* toggle page */
        this.setState({initLoading: true});
        this.loadingClose(nextProps);
    }

    componentDidMount() {
        this.loadingClose(this.props);
    }

    componentWillUnmount() {
        clearTimeout(this.setTimeClear); // 解除Loading定时器.
    }

    render() {
        console.group();
        console.time();

        let { selVal, menuDefOpenKeys, breadcrumb, Config, match } = this.props;
        const sysPre = Config.prefixs.system;
        if (menuDefOpenKeys === undefined) {
            menuDefOpenKeys = 'list'; // 默认展开列表实例.
        }

        // token verify loading.
        if (!this.props.token) {
            return (
                <div className={sysPre + 'fullScreenLoading'}>
                    <Spin size="large" className={sysPre + 'loadingCenter'} />
                </div>
            );
        }

        let breadcrumbWrapStyle = {
            marginTop: '23px',
            marginLeft: '20px'
        };

        let title = 'Noah System';
        if (this.state.collapsed) {
            title = 'N';
        }

        let logoutCls = sysPre + 'fullScreenLoadingFadeout';
        if (match.path === '/logout') {
            logoutCls = sysPre + 'logoutFullScreenLoadingFadeout';
        }

        console.log('Layout');
        console.timeEnd();
        console.groupEnd();

        return (
            <Layout>
                <OperationLoading Config={Config} />
                {
                    this.state.initLoading === true && <div className={logoutCls}>
                        <Spin size="large" className={sysPre + 'loadingCenter'} />
                    </div>
                }
                <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                    <div className="logo">{title}</div>
                    <NoahSubMenu theme="dark" defaultSelectedKeys={[selVal]} selectedKeys={[selVal]} mode="inline" defaultOpenKeys={[menuDefOpenKeys]} />
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0 }}>
                        <Icon className="trigger" type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} onClick={this.toggle} />
                    </Header>
                    <div style={breadcrumbWrapStyle}>
                        <NoahBreadcrumb breadcrumb={breadcrumb} />
                    </div>
                    <Content style={{ margin: '24px 16px', padding: '24px', background: '#fff', height: '100%' }}>
                        {this.props.children}
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.globalState.token,
        tokenTime: state.globalState.tokenTime
    };
};

export default connect(mapStateToProps)(NoahLayout);
