import React from 'react';
import { connect } from 'react-redux';

/* ant */
import { Spin } from 'antd';

class OperationLoading extends React.Component {
    render() {
        let { Config } = this.props;
        let sysPre = Config.prefixs.system;
        let operationLoading = this.props.operationLoading ? this.props.operationLoading : false;

        return (
            <div>
                {
                    operationLoading === true && <div className={sysPre + 'operation-loading'}>
                        <Spin size="large" className={sysPre + 'loadingCenter'} />
                    </div>
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    console.group();
    console.time();
    console.log('OperationLoading Component:' + state.globalState.operationLoading);
    console.timeEnd();
    console.groupEnd();

    return {
        operationLoading: state.globalState.operationLoading
    };
};

export default connect(mapStateToProps)(OperationLoading);
