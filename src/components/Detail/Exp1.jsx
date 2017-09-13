import React from 'react';
import { connect } from 'react-redux';
import { Modal } from 'antd';
import { is as immuIs, Map as immuMap } from 'immutable';

/* action */
import { pageDetailInfoEmpty } from '../../redux/Actions/page';

class DetailExp1 extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: false
        };
    }

    handleOk = () => {
        this.setState({visible: false});
        const { dispatch } = this.props;
        dispatch(pageDetailInfoEmpty());
    }

    handleCancel = () => {
        this.setState({visible: false});
        const { dispatch } = this.props;
        dispatch(pageDetailInfoEmpty());
    }

    componentWillReceiveProps(nextProps) {
        // 是否显示详情.
        if (!immuIs(immuMap(nextProps.detailInfo), immuMap({}))) {
            this.setState({visible: true});
        }
    }

    render() {
        const { Config } = this.props;
        const sysPre = Config.prefixs.system;
        let detailInfo = this.props.detailInfo ? this.props.detailInfo : {};

        return (
            <Modal
                title="用户详情"
                visible={this.state.visible}
                // onOk={this.handleOk}
                onCancel={this.handleCancel}
                // confirmLoading={true}
                // closable={false}
                // okText="关闭"
                footer={null}
            >
                <div className={sysPre + 'user-detail'}>
                    <p>id: {detailInfo.id}</p>
                    <p>name: {detailInfo.name}</p>
                    <p>age: {detailInfo.age}</p>
                    <p>address: {detailInfo.address}</p>
                    <p>date: {detailInfo.date}</p>
                </div>
            </Modal>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        detailInfo: state.pageState.detailInfo
    };
};

export default connect(mapStateToProps)(DetailExp1);
