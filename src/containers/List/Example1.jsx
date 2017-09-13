import React from 'react';
import { connect } from 'react-redux';

/* component */
import ListExp1 from '../../components/List/Exp1';

class Example1 extends React.Component {
    render() {
        const { Config } = this.props;
        return (
            <div>
                <ListExp1 Config={Config} />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

export default connect(mapStateToProps)(Example1);
