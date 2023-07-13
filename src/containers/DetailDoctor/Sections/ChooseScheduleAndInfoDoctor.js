import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ChooseScheduleAndInfoDoctor.scss'
import * as userAction from '../../../store/actions';
import { fetchTimeSchedule } from '../../../services/userService';
import moment from 'moment/moment';
import _ from 'lodash';
import ModalBookSchedule from '../ModalBookSchedule';


const parser = new DOMParser();


class ChooseScheduleAndInfoDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            infoDoctor: {},
            infoDoctorSchedule: {},
            arrTimeSchedule: [],
            arrTimeSlectdate: [],
            seeMore: false,
            isModal: false,
            timePick: {}
        }
    }
    handleFetchTimeSchedule = async (doctorId, currentDate) => {
        let timeSchedule = await fetchTimeSchedule(doctorId, currentDate);
        timeSchedule.data = timeSchedule.data.map(time => {
            time.isSeleted = false;
            return time
        })
        this.setState({
            arrTimeSchedule: timeSchedule.data
        })
    }
    async componentDidMount() {
        console.log('check id doctor', this.props.paramsId)
        this.props.fetchInfoDoctor(this.props.paramsId);
        let arrTimeSlectdate = []
        for (let i = 0; i < 7; i++) {
            let obj = {};
            obj.label = moment(new Date().setHours(0, 0, 0, 0)).add(i, 'days').format('dddd DD-MM');
            obj.value = moment(new Date().setHours(0, 0, 0, 0)).add(i, 'days').valueOf();
            arrTimeSlectdate.push(obj)
        }
        await this.setState({
            arrTimeSlectdate
        })
        this.handleFetchTimeSchedule(this.props.paramsId, this.state.arrTimeSlectdate[0].value)
    }
    componentDidUpdate(prevProps, prevState) {

        if (prevProps.infoDoctorSchedule !== this.props.infoDoctorSchedule) {
            console.log('check props info doctor schedule', this.props.infoDoctorSchedule)
            this.setState({
                infoDoctorSchedule: this.props.infoDoctorSchedule
            })
        }
    }

    handleChangeTime = async (event) => {
        let doctorId = this.props.paramsId;
        let currentDate = event.target.value;
        this.handleFetchTimeSchedule(doctorId, currentDate)
    }
    handleClickPickTime = async (time, index) => {
        this.setState({
            isModal: true,
            timePick: time,
        })
    }
    handleClickSeeHideMore = async () => {
        this.setState({
            seeMore: !this.state.seeMore
        })
    }
    handleToggleBookSchedule = () => {
        this.setState({
            isModal: !this.state.isModal
        })
    }
    render() {
        let { infoDoctorSchedule, arrTimeSlectdate, arrTimeSchedule, seeMore } = this.state;
        return (
            <div className='schedule-info-doctor row my-3'>
                <div className='content-left-info-schedule-doctor col-7'>
                    <select onChange={(event) => this.handleChangeTime(event)} className="form-select form-select-lg mb-3" aria-label=".form-select-lg example">
                        {arrTimeSlectdate && arrTimeSlectdate.length !== 0 &&
                            arrTimeSlectdate.map((time, index) => {
                                return (
                                    <option key={index} value={time.value}>{time.label}</option>
                                )
                            })
                        }
                    </select>
                    <div className='title-schedule'>
                        <i className="fas fa-home"></i>
                        <span>Lịch khám</span>
                    </div>
                    <div className='examination-time'>
                        {arrTimeSchedule && arrTimeSchedule.length !== 0 &&
                            arrTimeSchedule.map((time, index) => {
                                return (
                                    <span key={index} onClick={() => this.handleClickPickTime(time, index)} className="badge time-element ">{time.timeData.valueVi}</span>
                                )
                            })
                        }
                    </div>
                </div>
                {!_.isEmpty(infoDoctorSchedule) &&
                    <div className='content-right-info-schedule-doctor col-5'>
                        <div className='title-address-clinic'>ĐỊA CHỈ KHÁM</div>
                        <div className='name-clinic'>{infoDoctorSchedule.nameClinic}</div>
                        <div className='address-clinic'>{infoDoctorSchedule.addressClinic}</div>
                        <hr />
                        <div className='price-doctor-content'>
                            <span className='title-price'>GIÁ KHÁM: &nbsp;</span>
                            <span className='price'>{infoDoctorSchedule.priceData.valueVi}
                                <sup>đ</sup>
                            </span>
                            {!seeMore &&
                                <span onClick={() => this.handleClickSeeHideMore()} className='see-more-price text-primary'>&nbsp; Xem thêm</span>
                            }
                            {seeMore &&
                                <div className='see-more-content'>
                                    <span>Phương thức thanh toán: {infoDoctorSchedule.paymentData.valueVi}</span>
                                    <div onClick={() => this.handleClickSeeHideMore()} className='hide-content-price text-primary'>Thu gọn</div>
                                </div>
                            }
                        </div>
                    </div>
                }
                <ModalBookSchedule
                    isModal={this.state.isModal}
                    handleToggleBookSchedule={this.handleToggleBookSchedule}
                    infoDoctorSchedule={infoDoctorSchedule}
                    timePick={this.state.timePick}
                />
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        infoDoctorSchedule: state.user.infoDoctorSchedule
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchInfoDoctor: (id) => dispatch(userAction.fetchInfoDoctorStart(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChooseScheduleAndInfoDoctor);
