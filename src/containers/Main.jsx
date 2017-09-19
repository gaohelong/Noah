import React from 'react';
import { connect } from 'react-redux';
import { getLocalStorageObjItem } from '../tools/tools';

class Main extends React.Component {
    render() {
        // console.log('Main', this.props);
        return (
            <div>Hi: <span style={{color: 'red'}}>{getLocalStorageObjItem('userinfo').name}</span>. <br />Welcome to useing Noah System.</div>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

export default connect(mapStateToProps)(Main);
