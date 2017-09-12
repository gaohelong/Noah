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

    componentWillReceiveProps(nextProps) {
        // console.log(nextProps, this.props);

        // token verify.
        if (!nextProps.token) {
            let { history } = this.props;
            history.push('/');
        }

        this.setState({initLoading: true});
    }

    render() {
        const { selVal, menuDefOpenKeys, breadcrumb, Config } = this.props;
        const sysPre = Config.prefixs.system;

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

        // toggle page loading定时器.
        clearTimeout(this.setTimeClear);
        this.setTimeClear = setTimeout(() => {
            this.setState({initLoading: false});
        }, Config.times.loadingTime);

        return (
            <Layout>
                {
                    this.state.initLoading === true && <div className={sysPre + 'fullScreenLoadingFadeout'}>
                        <Spin size="large" className={sysPre + 'loadingCenter'} />
                    </div>
                }
                <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                    <div className="logo">{title}</div>
                    <NoahSubMenu theme="dark" defaultSelectedKeys={[selVal]} mode="inline" defaultOpenKeys={[menuDefOpenKeys]} />
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
        token: state.globalState.token
    };
};

export default connect(mapStateToProps)(NoahLayout);
