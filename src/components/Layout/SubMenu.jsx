import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Icon} from 'antd';
const SubMenu = Menu.SubMenu;

class NoahSubMenu extends React.Component {
    menuKey = 1;
    menuConfig = [
        {
            to: '/main',
            icon: 'github',
            title: 'Home'
        },
        {
            key: 'list',
            icon: 'desktop',
            title: '列表实例',
            sub: [
                {to: '/list/exp1', icon: 'github', title: '列表实例1'},
                {to: '/list/exp2', icon: 'github', title: '列表实例2'}
            ]
        },
        {
            key: 'custom',
            icon: 'windows',
            title: '自定义',
            sub: [
                {to: '/custom/collapse', icon: 'wifi', title: '折叠面板'}
            ]
        },
        {
            to: '/logout',
            icon: 'logout',
            title: '退出'
        }
    ];

    menuProc(data) {
        const result = (
            <Menu.Item key={this.menuKey++}>
                <Link to={data.to}>
                    <Icon type={data.icon} />
                    <span>{data.title}</span>
                </Link>
            </Menu.Item>
        );
        return result;
    }

    subMenuProc(v, sub) {
        const result = sub.map((val) => {
            return this.menuProc(val);
        });

        return (
            <SubMenu key={v.key} title={<span><Icon type={v.icon} /><span>{v.title}</span></span>}>
                {result}
            </SubMenu>
        );
    }

    render() {
        this.menuKey = 1;
        const { theme, defaultSelectedKeys, mode, defaultOpenKeys, selectedKeys } = this.props;
        const menuList = this.menuConfig.map((v, i) => {
            let result;
            if (v.sub === undefined) {
                return this.menuProc(v);
            }

            result = this.subMenuProc(v, v.sub);
            return result;
        });

        return (
            <Menu theme={theme} defaultSelectedKeys={defaultSelectedKeys} selectedKeys={selectedKeys} mode={mode} defaultOpenKeys={defaultOpenKeys}>
                {menuList}
            </Menu>
        );
    }
}

export default NoahSubMenu;
