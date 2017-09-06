import React from 'react';
import { Icon, Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';

class NoahBreadcrumb extends React.Component {
    render() {
        let { breadcrumb } = this.props;
        breadcrumb = breadcrumb.split('|');
        let breadcrumbList = breadcrumb.map((v, i) => {
            let arr = v.split('~');
            let to = '/' + arr[1];
            // return (
            //     <Breadcrumb.Item key={'breadcrumb_' + i}>
            //         <Link to={to}>{arr[0]}</Link>
            //     </Breadcrumb.Item>
            // );
            return (
                <Breadcrumb.Item key={'breadcrumb_' + i}>
                    {arr[0]}
                </Breadcrumb.Item>
            );
        });

        return (
            <Breadcrumb>
                {breadcrumbList}
            </Breadcrumb>
        );
    }
}

export default NoahBreadcrumb;
