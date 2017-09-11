import React from 'react';
import { connect } from 'react-redux';
import { Table, Icon } from 'antd';

/* action */
import { pageExp1List } from '../../redux/Actions/page';
import { pageLoading } from '../../redux/Actions/global';

class Example1 extends React.Component {
    constructor(props) {
        super(props);

        // func.
        this.handleTableChange = this.handleTableChange.bind(this);
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(pageExp1List(dispatch, '/pageExp1List'));
    }

    handleTableChange(pagination, filters, sorter) {
        // console.log(pagination, filters, sorter);
        const { dispatch } = this.props;
        dispatch(pageLoading());
        dispatch(pageExp1List(dispatch, '/pageExp1List', {page: pagination.current}));
    }

    render() {
        let exp1List = {};
        let data = [];
        let total = 0;
        let loading = true;
        const pageSize = 10;

        if (this.props.exp1List) {
            exp1List = this.props.exp1List;
            data = exp1List.list.slice((exp1List.curPage - 1) * pageSize, exp1List.curPage * pageSize);
            total = exp1List.total;
            loading = this.props.pageLoading;
        }

        const columns = [
            {
                title: 'id',
                dataIndex: 'id',
                key: 'id'
            },
            {
                title: '姓名',
                dataIndex: 'name',
                key: 'name',
                render: text => <a href="#">{text}</a>
            },
            {
                title: '年龄',
                dataIndex: 'age',
                key: 'age'
            },
            {
                title: '地址',
                dataIndex: 'address',
                key: 'address'
            },
            {
                title: '日期',
                dataIndex: 'date',
                key: 'date'
            },
            {
                title: '操作',
                key: 'operation',
                render: (text, record) => (
                    <span>
                        <a href="#">{record.id}</a>
                        <span className="ant-divider" />
                        <a href="#">查看</a>
                        <span className="ant-divider" />
                        <a href="#">编辑</a>
                        <span className="ant-divider" />
                        <a href="#">删除</a>
                    </span>
                )
            }
        ];

        const paginationConfig = {
            pageSize: pageSize,
            showQuickJumper: true,
            defaultCurrent: 1,
            total: total,
            showTotal: (total, range) => (`${range[0]} - ${range[1]} of ${total} items`)
        };

        return (
            <div>
                <Table columns={columns} dataSource={data} pagination={paginationConfig} loading={loading}
                    onChange={this.handleTableChange} />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        exp1List: state.pageState.exp1List,
        pageLoading: state.globalState.pageLoading
    };
};

export default connect(mapStateToProps)(Example1);
