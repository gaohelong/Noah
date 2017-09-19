import React from 'react';
import { connect } from 'react-redux';
import { Table, Icon, Popconfirm, message } from 'antd';
import { Map as immuMap, is as immuIs } from 'immutable';

/* action */
import { pageExp1List, pageExp1Del, pageDetailInfo } from '../../redux/Actions/page';
import { globalOperationLoadingOpen } from '../../redux/Actions/global';

/* component */
import DetailExp1 from '../Detail/Exp1';

class ListExp1 extends React.Component {
    constructor(props) {
        super(props);

        // func.
        this.handleTableChange = this.handleTableChange.bind(this);
        // this.handleDelete = this.handleDelete.bind(this);

        // state.
        this.state = {
            selectedRowKeys: []
        };
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(globalOperationLoadingOpen());
        dispatch(pageExp1List(dispatch, '/pageExp1List'));
    }

    componentDidUpdate(prevProps, prevState) {
        // 删除提示.
        let { delInfo } = this.props;
        let delInfoCompRes = immuIs(immuMap(prevProps.delInfo), immuMap(delInfo));
        if (delInfo && !delInfoCompRes) {
            message.config({top: 10});

            if (delInfo.type === 'success') {
                message.success(delInfo.msg, 3);
                this.handleTableChange({current: delInfo.curPage});
            } else if (delInfo.type === 'fail') {
                message.error(delInfo.msg, 3);
            }
        }
    }

    // 分页.
    handleTableChange(pagination, filters, sorter) {
        this.setState({selectedRowKeys: []});

        // console.log(pagination, filters, sorter);
        const { dispatch } = this.props;
        dispatch(globalOperationLoadingOpen());
        dispatch(pageExp1List(dispatch, '/pageExp1List', {page: pagination.current}));
    }

    // 删除.
    // 给当前类设置实例属性, 这样设置跟在constructor中的设置this.handleDelete.bind(this)功能是一样的.
    handleDelete = (id, curPage, pageSize, total) => {
        // console.log(id, curPage);
        const { dispatch } = this.props;

        // 计算删除后本页是否还有数据.
        const totalPage = Math.ceil(total / pageSize);
        const totalFloorPage = Math.floor(total / pageSize);
        if (curPage === totalPage && totalPage > 1) {
            curPage = total - totalFloorPage * pageSize === 1 ? curPage - 1 : curPage;
        }

        dispatch(pageExp1Del(dispatch, '/pageExp1Del', {id: id, curPage: curPage}));
    }

    // 查看详情.
    handleShowDetail = (detailInfo) => {
        const { dispatch } = this.props;
        dispatch(pageDetailInfo(detailInfo));
    }

    render() {
        console.group();
        console.time();
        console.log('ListExp1Component');

        const { Config } = this.props;

        // list.
        let exp1List = {};
        let data = [];
        let total = 0;
        let loading = true;
        let curPage = 0;
        const pageSize = 12;

        if (this.props.exp1List) {
            exp1List = this.props.exp1List;
            curPage = exp1List.curPage;
            data = exp1List.list.slice((curPage - 1) * pageSize, curPage * pageSize);
            total = exp1List.total;
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
                render: (text, record) => {
                    return (
                        <a onClick={() => this.handleShowDetail(record)}>{text}</a>
                    );
                }
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
                render: (text, record) => {
                    let delText = '确定要删除' + record.name + '?';
                    return (
                        <span>
                            <a>{record.id}</a>
                            <span className="ant-divider" />
                            <a onClick={() => this.handleShowDetail(record)}>查看</a>
                            <span className="ant-divider" />
                            <a>编辑</a>
                            <span className="ant-divider" />
                            <Popconfirm title={delText} onConfirm={() => this.handleDelete(record.id, curPage, pageSize, total)}>
                                <a>删除</a>
                            </Popconfirm>
                        </span>
                    );
                }
            }
        ];

        const paginationConfig = {
            pageSize: pageSize,
            showQuickJumper: true,
            defaultCurrent: 1,
            total: total,
            showTotal: (total, range) => (`${range[0]} - ${range[1]} of ${total} items`)
        };

        // 全选、单选配置.
        const { selectedRowKeys } = this.state;
        const rowSelection = {
            // type: 'radio', // radio、checkbox. 默认为checkbox
            selectedRowKeys, // 如果设置此项并且为[]那么分页的时候上页的选项不会附加到当前页, 否则附加到当前页(指定选中项的 key 数组，需要和 onChange 进行配合).
            onChange: (selectedRowKeys, selectedRows) => {
                console.group();
                console.log(selectedRowKeys);
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
                console.groupEnd();

                this.setState({selectedRowKeys});
            },
            // onSelect: (record, selected, selectedRows) => {
            //     console.log(record, selected, selectedRows);
            // },
            // 设置name等于Disabled User的行不能被选中.
            getCheckboxProps: record => ({
                disabled: record.name === 'Disabled User'    // Column configuration not to be checked
            })
        };

        console.timeEnd();
        console.groupEnd();

        return (
            <div>
                <DetailExp1 Config={Config} />
                <Table columns={columns} dataSource={data} pagination={paginationConfig}
                    onChange={this.handleTableChange} expandedRowRender={record => <p>{record.desc}</p>}
                    rowSelection={rowSelection} />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        exp1List: state.pageState.exp1List,
        delInfo: state.pageState.delInfo
    };
};

export default connect(mapStateToProps)(ListExp1);
