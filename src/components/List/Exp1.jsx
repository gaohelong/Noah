import React from 'react';
import { connect } from 'react-redux';
import { Map as immuMap, is as immuIs } from 'immutable';
import { Table, Icon, Popconfirm, message, Button, Form, Tooltip } from 'antd';
const FormItem = Form.Item;

/* action */
import { pageExp1List, pageExp1Del, pageDetailInfo } from '../../redux/Actions/page';
import { globalOperationLoadingOpen } from '../../redux/Actions/global';

/* component */
import DetailExp1 from '../Detail/Exp1';
import Exp1Add from './Exp1Add';

/* search condition */
let searchObj = {};

/* SearchFrom */
class SearchForm extends React.Component {
    // 查询.
    searchHandle = (e) => {
        e.preventDefault();
        const { dispatch } = this.props;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                searchObj = Object.assign({}, searchObj, values);
                console.log(searchObj);
                console.log(values.searchText);
                this.props.searchCallbackHandle();
            }
        });
    }

    render() {
        const { getFieldDecorator, btnLarge } = this.props.form;
        const { Config } = this.props;
        const sysPre = Config.prefixs.system;

        return (
            <Form layout="inline" onSubmit={this.searchHandle}>
                <FormItem>
                    {getFieldDecorator('searchText', {
                        // rules: [{ required: true, message: '请输入要查询的用户名!' }]
                    })(
                        <input type="text" className={sysPre + 'input-base'} placeholder="请输入要查询的用户名!" autoComplete="off" />
                    )}
                </FormItem>
                <FormItem>
                    <Button htmlType="submit" size={btnLarge}>查询</Button>
                </FormItem>
            </Form>
        );
    }
}
const SearchFormComponent = Form.create()(SearchForm);

class ListExp1 extends React.Component {
    constructor(props) {
        super(props);

        // func.
        this.handleTableChange = this.handleTableChange.bind(this);
        // this.handleDelete = this.handleDelete.bind(this);

        // state.
        this.state = {
            selectedRowKeys: [],
            addVisible: false,
            curPage: 0
        };
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(globalOperationLoadingOpen());
        dispatch(pageExp1List(dispatch, '/pageExp1List'));
        console.log('cDM:', searchObj);
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
        const delay = pagination.delay ? pagination.delay : 0;

        setTimeout(() => {
            // console.log(pagination, filters, sorter);
            const { dispatch } = this.props;
            this.setState({curPage: pagination.current});
            dispatch(globalOperationLoadingOpen());
            dispatch(pageExp1List(dispatch, '/pageExp1List', {page: pagination.current, ...searchObj}));

            if (pagination.msg) {
                message.success(pagination.msg);
            }
        }, delay);
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

    // 添加.
    addHandle = (val = false) => {
        this.setState({addVisible: val});
    }

    // 操作回调.
    operationCallbackHandle = (type, msg) => {
        const delay = 800;
        switch (type) {
            case 'add':
                this.handleTableChange({current: 1, delay: delay, msg: msg});
                break;
            case 'edit':
                this.handleTableChange({current: this.props.exp1List.curPage, delay: delay, msg: msg});
                break;
        }
    }

    // 查询回调.
    searchCallbackHandle = () => {
        this.handleTableChange({current: 1});
    };

    componentWillUnmount() {
        // data reset.
        console.log('cWU:', searchObj);
        searchObj = {};
        console.log('cWU:', searchObj);
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

        const mouseEnterDelay = 0.2;
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
                        <Tooltip placement="top" title={'我的英文名字是：' + text} mouseEnterDelay={mouseEnterDelay}>
                            <a onClick={() => this.handleShowDetail(record)}>{text}</a>
                        </Tooltip>
                    );
                }
            },
            {
                title: '年龄',
                dataIndex: 'age',
                key: 'age',
                render: (text, record) => {
                    return (
                        <Tooltip placement="left" title={'我的年龄是:' + text}>
                            <a>{text}</a>
                        </Tooltip>
                    );
                }
            },
            {
                title: '地址',
                dataIndex: 'address',
                key: 'address',
                render: (text, record) => {
                    return (
                        <Tooltip placement="bottom" title={'我的家庭住址是: ' + text} mouseEnterDelay={mouseEnterDelay}>
                            <a>{text}</a>
                        </Tooltip>
                    );
                }
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

        let paginationConfig = {
            pageSize: pageSize,
            showQuickJumper: true,
            defaultCurrent: 1,
            total: total,
            showTotal: (total, range) => (`pageSize: ${pageSize} | ${range[0]} - ${range[1]} of ${total} items`)
        };

        console.log('page:', this.state.curPage);
        if (this.state.curPage > 0) {
            paginationConfig.current = this.state.curPage;
        }

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

        const btnLarge = 'large';
        const sysPre = Config.prefixs.system;

        return (
            <div>
                <div className={sysPre + 'list-operation' + ' ' + sysPre + 'clearfix'}>
                    <div className="opeartion-btn">
                        <Button size={btnLarge} onClick={() => this.addHandle(true)}>添加</Button>
                        <Button size={btnLarge}>批量删除</Button>
                    </div>
                    <div className="search-wrap">
                        <SearchFormComponent Config={Config} btnLarge={btnLarge} searchCallbackHandle={this.searchCallbackHandle} />
                    </div>
                </div>
                <DetailExp1 Config={Config} />
                <Exp1Add Config={Config} addVisible={this.state.addVisible} addHandle={this.addHandle} operationCallbackHandle={this.operationCallbackHandle} />
                <Table columns={columns} dataSource={data} pagination={paginationConfig}
                    onChange={this.handleTableChange} expandedRowRender={record => <p>{record.desc}</p>}
                    rowSelection={rowSelection} />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    console.log('exp1-mstp', state);
    return {
        exp1List: state.pageState.exp1List,
        delInfo: state.pageState.delInfo
    };
};

export default connect(mapStateToProps)(ListExp1);
