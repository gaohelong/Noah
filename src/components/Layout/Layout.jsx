import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Icon} from 'antd';
const { Header, Sider, Content } = Layout;

/* Noah Compoent */
import NoahBreadcrumb from './Breadcrumb';
import NoahSubMenu from './SubMenu';

class NoahLayout extends React.Component {
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

    render() {
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
                    <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
                        {this.props.children}
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

export default NoahLayout;
