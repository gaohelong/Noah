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
    console.log('OperationLoading Component');
    return {
        operationLoading: state.globalState.operationLoading
    };
};

export default connect(mapStateToProps)(OperationLoading);
