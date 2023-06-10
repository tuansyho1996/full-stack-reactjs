import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import Specialty from './Sections/Specialty';

class HomePage extends Component {

    render() {
        return (
            <div className='home-page'>
                <Header />
                <Specialty />
                <div style={{ 'height': '300px' }}></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
