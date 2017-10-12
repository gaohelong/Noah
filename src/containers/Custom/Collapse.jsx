import React from 'react';
import { connect } from 'react-redux';

// 各自展开.
class CollapseItem extends React.Component {
    state = {
        sh: {display: 'none'}
    };

    clickHandle = (e) => {
        let sh = 'none';
        if (this.state.sh.display === 'none') {
            sh = 'block';
        }

        this.setState({sh: {display: sh}});
    };

    render() {
        const { title } = this.props;
        return (
            <div style={divStyle} onClick={this.clickHandle}>
                <div style={titleStyle}>+ {title}</div>
                <div style={this.state.sh}>{title} Detail</div>
            </div>
        );
    }
}

// 只能展开一项.
class CollapseItem1 extends React.Component {
    state = {
        sh: {display: 'none'}
    };

    clickHandle = (e) => {
        console.log('1:', this.props);
        this.key = this.props._key;
        this.props.clickHandle(this.props._key);
    };

    componentWillReceiveProps(nextProps) {
        console.log('cwrp:', this.props);
        let sh = 'none';
        console.log(this.props._key, this.key);
        if (this.props._key === this.key) {
            if (this.state.sh.display === 'none') {
                sh = 'block';
            }
        }
        this.setState({sh: {display: sh}});
        this.key = '';
    }

    render() {
        const { title } = this.props;
        return (
            <div style={divStyle} onClick={this.clickHandle}>
                <div style={titleStyle}>+ {title}</div>
                <div style={this.state.sh}>{title} Detail</div>
            </div>
        );
    }
}

// Wrapper
class Wrapper extends React.Component {
    constructor(props) {
        super(props);

        // state.
        this.state = {
            shKey: ''
        };

        // func.
        this.clickHandle = this.chickHandle.bind(this);
    }

    chickHandle(key) {
        console.log('2:', key);
        this.setState({shKey: 'testkey'});
    }

    render() {
        this.children = this.props.children;
        if (this.props.type === '2') {
            this.children = this.props.children.map((v, i) => {
                return React.cloneElement(v, {
                    _key: v.key,
                    testKey: this.state.shKey,
                    clickHandle: this.clickHandle
                });
            });

            console.log('3:', this.state);
        }

        return (
            <div>{this.children}</div>
        );
    }
}

// Collapse.
class Collapse extends React.Component {
    render() {
        return (
            <div>
                <div style={{width: '300px'}}>
                    <Wrapper type="1">
                        <CollapseItem title="Collapse1" key="1" />
                        <CollapseItem title="Collapse2" key="2" />
                        <CollapseItem title="Collapse3" key="3" />
                    </Wrapper>
                </div>
                <div style={{width: '400px', marginTop: '30px'}}>
                    <Wrapper type="2">
                        <CollapseItem1 title="Collapse-1" key="k1" />
                        <CollapseItem1 title="Collapse-2" key="k2" />
                        <CollapseItem1 title="Collapse-3" key="k3" />
                    </Wrapper>
                </div>
            </div>
        );
    }
}

const divStyle = {
    lineHeight: '30px',
    borderBottom: '1px solid #ccc'
};

const titleStyle = {
    paddingLeft: '6px',
    cursor: 'pointer'
};

const mapStateToProps = (state) => {
    return {};
};

export default connect(mapStateToProps)(Collapse);
