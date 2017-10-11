import React from 'react';
import { connect } from 'react-redux';
import { Modal, Form, Input, Button, message } from 'antd';
const FormItem = Form.Item;

/* action */
import { exp1AddSave } from '../../redux/Actions/page';
import { globalOperationLoadingOpen } from '../../redux/Actions/global';

/* Exp1AddForm */
class Exp1AddForm extends React.Component {
    saveHandle = (e) => {
        e.preventDefault();
        const { dispatch } = this.props;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                // console.log('Received values of form: ', values);
                dispatch(globalOperationLoadingOpen());

                // 设置延迟提交.
                setTimeout(() => {
                    dispatch(exp1AddSave(dispatch, '/exp1AddSave', values));
                }, 2000);
            }
        });
    };

    cancelHandle = () => {
        this.props.addHandle(false);
    };

    componentWillUpdate(prevProps, prevState) {
        if (!this.props.addVisible) {
            this.props.form.resetFields();
        }
    }

    render() {
        const { dispatch, sysPre } = this.props;
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
                md: { span: 8}
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 14 },
                md: { span: 8 }
            }
        };
        const btnLayout = {
            wrapperCol: {
                md: { span: 16, offset: 8 }
            }
        };
        const rowCls = sysPre + 'add-row-base';
        console.log('Exp1AddForm');

        return (
            <Form onSubmit={this.saveHandle} id="exp1-add">
                <div className={rowCls}>
                    <FormItem {...formItemLayout} label="姓名" hasFeedback={true}>
                        {getFieldDecorator('fullName', {
                            rules: [{ required: true, message: '请输入姓名!' }]
                        })(
                            <Input type="text" placeholder="姓名" autoComplete="off" className="test-full-name" />
                        )}
                    </FormItem>
                </div>
                <div className={rowCls}>
                    <FormItem {...formItemLayout} label="年龄">
                        {getFieldDecorator('age', {
                            rules: []
                        })(
                            <Input type="text" placeholder="年龄" autoComplete="off" />
                        )}
                    </FormItem>
                </div>
                <div className={rowCls}>
                    <FormItem {...formItemLayout} label="住址" hasFeedback={true}>
                        {getFieldDecorator('addr', {
                            rules: []
                        })(
                            <Input type="text" placeholder="住址" autoComplete="off" />
                        )}
                    </FormItem>
                </div>
                <FormItem {...btnLayout}>
                    <Button style={{marginRight: '16px'}} onClick={this.cancelHandle}>取消</Button>
                    <Button type="primary" htmlType="submit">确定</Button>
                </FormItem>
            </Form>
        );
    }
}
const Exp1AddFormComponent = Form.create()(Exp1AddForm);

class Exp1Add extends React.Component {
    handleCancel = (e) => {
        console.log('cancel');
        this.props.addHandle(false);
    }

    componentWillReceiveProps(nextProps) {
        console.log('Exp1Add Receive:', nextProps.renderTime, this.props.renderTime);
        if (nextProps.renderTime !== this.props.renderTime) {
            this.handleCancel();
            message.success(nextProps.addMsg, 2);
            this.props.operationCallbackHandle('add');
            return '';
        }
    }

    render() {
        const { Config, dispatch } = this.props;
        const sysPre = Config.prefixs.system;
        const style = {
            height: '300px',
            overflow: 'hidden',
            overflowY: 'auto'
        };
        console.log('Exp1Add:', this.props);

        return (
            <Modal
                title="列表实例1-添加"
                width="640px"
                visible={this.props.addVisible}
                // onOk={this.handleOk}
                // okText="保存"
                onCancel={this.handleCancel}
                // cancelText="关闭"
                maskClosable={false}
                closable={true}
                footer={null}
            >
                <div className={sysPre + 'exp1-add'} style={style}>
                    <Exp1AddFormComponent sysPre={sysPre} addVisible={this.props.addVisible} dispatch={dispatch} addHandle={this.props.addHandle} />
                </div>
            </Modal>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        renderTime: state.pageState.renderTime,
        addMsg: state.pageState.addMsg
    };
};

export default connect(mapStateToProps)(Exp1Add);
