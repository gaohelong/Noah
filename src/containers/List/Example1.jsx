import React from 'react';
import { Table, Icon } from 'antd';

class Example1 extends React.Component {
    render() {
        // console.log('Example1', this.props);

        const columns = [
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                render: text => <a href="#">{text}</a>
            },
            {
                title: 'Age',
                dataIndex: 'age',
                key: 'age'
            },
            {
                title: 'Address',
                dataIndex: 'address',
                key: 'address'
            },
            {
                title: 'Action',
                key: 'action',
                render: (text, record) => (
                    <span>
                        <a href="#">Action 一 {record.name}</a>
                        <span className="ant-divider" />
                        <a href="#">Delete</a>
                        <span className="ant-divider" />
                        <a href="#" className="ant-dropdown-link">
                            More actions <Icon type="down" />
                        </a>
                    </span>
                )
            }
        ];

        const data = [
            {key: '1', name: 'John Brown', age: 21, address: 'New York No. 1 Lake Park'},
            {key: '2', name: 'Jim Green', age: 22, address: 'London No. 1 Lake Park'},
            {key: '3', name: 'Joe Black', age: 23, address: 'Sidney No. 1 Lake Park'},
            {key: '4', name: 'Joe Black', age: 24, address: 'Sidney No. 1 Lake Park'},
            {key: '5', name: 'Joe Black', age: 25, address: 'Sidney No. 1 Lake Park'},
            {key: '6', name: 'Joe Black', age: 26, address: 'Sidney No. 1 Lake Park'},
            {key: '7', name: 'Joe Black', age: 27, address: 'Sidney No. 1 Lake Park'},
            {key: '8', name: 'Joe Black', age: 28, address: 'Sidney No. 1 Lake Park'},
            {key: '9', name: 'Joe Black', age: 29, address: 'Sidney No. 1 Lake Park'},
            {key: '10', name: 'Joe Black', age: 30, address: 'Sidney No. 1 Lake Park'},
            {key: '11', name: 'Joe Black', age: 31, address: 'Sidney No. 1 Lake Park'},
            {key: '12', name: 'Joe Black', age: 32, address: 'Sidney No. 1 Lake Park'},
            {key: '13', name: 'Joe Black', age: 33, address: 'Sidney No. 1 Lake Park'},
            {key: '14', name: 'Joe Black', age: 34, address: 'Sidney No. 1 Lake Park'},
            {key: '15', name: 'Joe Black', age: 35, address: 'Sidney No. 1 Lake Park'},
            {key: '16', name: 'Joe Black', age: 36, address: 'Sidney No. 1 Lake Park'},
            {key: '17', name: 'Joe Black', age: 37, address: 'Sidney No. 1 Lake Park'},
            {key: '18', name: 'Joe Black', age: 38, address: 'Sidney No. 1 Lake Park'},
            {key: '19', name: 'Joe Black', age: 39, address: 'Sidney No. 1 Lake Park'},
            {key: '20', name: 'Joe Black', age: 40, address: 'Sidney No. 1 Lake Park'},
            {key: '21', name: 'Joe Black', age: 41, address: 'Sidney No. 1 Lake Park'}
        ];

        const paginationConfig = {
            pageSize: 4,
            showQuickJumper: true,
            defaultCurrent: 2,
            total: 21,
            showTotal: (total, range) => (`${range[0]} - ${range[1]} of ${total} items`)
        };

        return (
            <div>
                <Table columns={columns} dataSource={data} pagination={paginationConfig} />
            </div>
        );
    }
}

export default Example1;
