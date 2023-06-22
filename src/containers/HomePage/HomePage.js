import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import Specialty from './Sections/Specialty';
import OutstandingDoctor from './Sections/OutstandingDoctor';

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            settings: {
                infinite: true,
                speed: 500,
                slidesToShow: 4,
                slidesToScroll: 4,
                adaptiveHeight: true,
                infinite: false
            }
        }
    }
    render() {
        return (
            <div className='home-page'>
                <Header />
                <Specialty
                    settings={this.state.settings}
                />
                <hr />
                <OutstandingDoctor
                    settings={this.state.settings}
                />
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
