import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import * as userAction from '../../../store/actions';
import './ListDoctorSpecialty.scss';
import _ from 'lodash';
import Infomation from '../../DetailDoctor/Sections/Infomation';
import ChooseScheduleAndInfoDoctor from '../../DetailDoctor/Sections/ChooseScheduleAndInfoDoctor';


class ListDoctorSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listDoctor: ''
        }
    }
    componentDidMount() {
        this.props.fetchListDoctorSpecialty(this.props.specialtyId)
    }
    async componentDidUpdate(prevProps, prevState) {
        if (prevProps.listDoctor !== this.props.listDoctor) {
            this.setState({
                listDoctor: this.props.listDoctor
            })
        }
    }
    render() {
        let { listDoctor } = this.state
        console.log('check specialty  list doctor', this.state.listDoctor)
        return (
            <Fragment>
                <div className='list-specialty-doctor-container py-5'>
                    <div className='list-specialty-doctor-content container '>
                        {listDoctor && listDoctor.length &&
                            listDoctor.map(item => {
                                return (
                                    <div className='element-specialty-doctor p-5 row '>
                                        <div className='col-8 my-3'>
                                            <Infomation
                                                infoDoctor={item}
                                                isBreadcrumb={false}
                                            />
                                        </div>
                                        <div className='col-4'>
                                            <ChooseScheduleAndInfoDoctor
                                                paramsId={item.id}
                                                isRow={false}
                                            />
                                        </div>

                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        listDoctor: state.user.listDoctorPageDetailSpecialty
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchListDoctorSpecialty: (specialtyId) => dispatch(userAction.fetchListDoctorSpecialtyStart(specialtyId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListDoctorSpecialty);
