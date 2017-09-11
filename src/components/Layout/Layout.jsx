import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Layout, Icon} from 'antd';
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

    state = {
        collapsed: false
    };

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
        if (!nextProps.token) {
            let { history } = this.props;
            history.push('/');
        }
    }

    render() {
        // token verify loading.
        if (!this.props.token) {
            return <div>Loading......</div>;
        }

        const { selVal, menuDefOpenKeys, breadcrumb } = this.props;
        let breadcrumbWrapStyle = {
            marginTop: '23px',
            marginLeft: '20px'
        };

        let title = 'Noah System';
        if (this.state.collapsed) {
            title = 'N';
        }

        return (
            <Layout>
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
