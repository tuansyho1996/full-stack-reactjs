import React, { Component } from 'react';
import { connect } from 'react-redux';


class DetailDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        console.log('check run detail doctor')
        return (
            <div className=''>
                wellcome detail doctor
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
