import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu, Icon, Breadcrumb } from 'antd';
const { Header, Sider, Content } = Layout;
const SubMenu = Menu.SubMenu;

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
        let breadcrumbWrapStyle = {
            marginTop: '23px',
            marginLeft: '20px'
        };

        let title = 'Noah System';
        if (this.state.collapsed) {
            title = 'N';
        }

        // breadcrumb.
        let { breadcrumb } = this.props;
        breadcrumb = breadcrumb.split('|');
        let breadcrumbList = breadcrumb.map((v, i) => {
            let arr = v.split('/');
            let to = '/' + arr[1];
            return (
                <Breadcrumb.Item key={'breadcrumb_' + i}>
                    <Link to={to}>{arr[0]}</Link>
                </Breadcrumb.Item>
            );
        });

        return (
            <Layout>
                <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                    <div className="logo">{title}</div>
                    <Menu theme="dark" defaultSelectedKeys={[this.props.selVal]} mode="inline">
                        <Menu.Item key="1">
                            <Link to="/main">
                                <Icon type="github" />
                                <span>Home</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Link to="/pagination">
                                <Icon type="desktop" />
                                <span>分页管理</span>
                            </Link>
                        </Menu.Item>
                        <SubMenu key="sub1" title={<span><Icon type="user" /><span>用户管理</span></span>}>
                            <Menu.Item key="3">用户设置</Menu.Item>
                            <Menu.Item key="4">修改密码</Menu.Item>
                            <Menu.Item key="5">操作日志</Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub2" title={<span><Icon type="team" /><span>服务器组管理</span></span>}>
                            <Menu.Item key="6">IP管理</Menu.Item>
                            <Menu.Item key="8">操作日志</Menu.Item>
                        </SubMenu>
                        <Menu.Item key="9">
                            <Icon type="logout" />
                            <span>退出</span>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0 }}>
                        <Icon className="trigger" type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} onClick={this.toggle} />
                    </Header>
                    <div style={breadcrumbWrapStyle}>
                        <Breadcrumb>
                            {breadcrumbList}
                        </Breadcrumb>
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
