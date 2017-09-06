import React from 'react';
import { connect } from 'react-redux';

class Main extends React.Component {
    render() {
        // console.log('Main', this.props);

        return (
            <div>Welcome to useing Noah System.</div>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

export default connect(mapStateToProps)(Main);
