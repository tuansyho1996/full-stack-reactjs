import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import * as userAction from '../../store/actions';
import './DetailSpecialty.scss';
import Header from '../HomePage/Header';
import queryString from 'query-string';
import _ from 'lodash';
import InfoSpecialty from './Sections/InfoSpecialty';
import ListDoctorSpecialty from './Sections/ListDoctorSpecialty';




class DetailSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            detailSpecialty: {}
        }
    }
    componentDidMount() {
        let { id } = queryString.parse(this.props.location.search)
        this.props.fetchSpecialty(id);

    }
    async componentDidUpdate(prevProps, prevState) {
        if (prevProps.specialtyDetail !== this.props.specialtyDetail) {
            this.setState({
                detailSpecialty: this.props.specialtyDetail
            })
        }
    }
    render() {
        return (
            <Fragment>
                <Header
                    isBanner={false}
                />
                <InfoSpecialty
                    detailSpecialty={this.state.detailSpecialty}
                />
                <ListDoctorSpecialty />
            </Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        specialtyDetail: state.user.specialtyDetail
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchSpecialty: (id) => dispatch(userAction.fetchSpecialtyStart(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
