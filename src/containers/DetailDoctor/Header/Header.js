import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Header.scss'
import * as userAction from '../../../store/actions';


class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            infoDoctor: {}
        }
    }
    componentDidMount() {
    }
    componentDidUpdate(prevProps, prevState) {

    }
    render() {
        return (
            <div className='header-detail-doctor-container'>
                <div>
                    <i className="fas fa-arrow-left"></i>
                </div>
                <div>
                    <i className="fas fa-question"></i>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Header);
