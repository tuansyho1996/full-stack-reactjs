import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
// import * as userAction from '../../store/actions';
// import './ListDoctorSpecialty.scss';
import _ from 'lodash';


class ListDoctorSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    componentDidMount() {


    }
    async componentDidUpdate(prevProps, prevState) {

    }
    render() {
        let { detailSpecialty } = this.props
        return (
            <Fragment>
                <div className='list-specialty-doctor'>list doctor</div>
            </Fragment>
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

export default connect(mapStateToProps, mapDispatchToProps)(ListDoctorSpecialty);
