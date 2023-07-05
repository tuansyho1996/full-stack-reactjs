import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Information.scss'
import * as userAction from '../../../store/actions';
import { fetchTimeSchedule } from '../../../services/userService';
import moment from 'moment/moment';
import { Markup } from "react-render-markup";
const parser = new DOMParser();


class Information extends Component {
    constructor(props) {
        super(props);
        this.state = {
            infoDoctor: {},
            arrTimeSchedule: [],
            arrTimeSlectdate: []
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
        let doctorId = this.props.paramsId;
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
        if (prevProps.infoDoctor !== this.props.infoDoctor) {
            this.setState({
                infoDoctor: this.props.infoDoctor
            })
        }
    }

    handleChangeTime = async (event) => {
        let doctorId = this.props.paramsId;
        let currentDate = event.target.value;
        this.handleFetchTimeSchedule(doctorId, currentDate)
    }
    handleClickPickTime = async (index) => {

        let arrTimeScheduleCopy = this.state.arrTimeSchedule;
        arrTimeScheduleCopy[index].isSeleted = !arrTimeScheduleCopy[index].isSeleted
        this.setState({
            arrTimeSchedule: arrTimeScheduleCopy
        })
    }
    render() {
        let { infoDoctor, arrTimeSlectdate, arrTimeSchedule } = this.state;
        return (
            <div className='infomation-detail-doctor-container'>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><i className="fas fa-home"></i></li>
                        <li className="breadcrumb-item">Library</li>
                        <li className="breadcrumb-item ">Data</li>
                    </ol>
                </nav>
                <div className='info-doctor-content row'>
                    <div className='avartar-doctor col-2'>
                        {Object.keys(infoDoctor).length !== 0 &&
                            <div className='bg-image' style={{ backgroundImage: `url(${infoDoctor.image})` }}></div>
                        }
                    </div>
                    <div className='description-doctor col-6'>
                        {
                            Object.keys(infoDoctor).length !== 0 && infoDoctor.firstName && infoDoctor.lastName &&
                            <h2 className='title-doctor'>{infoDoctor.firstName}&nbsp;{infoDoctor.lastName}</h2>
                        }
                        {infoDoctor && infoDoctor.Markdown && infoDoctor.Markdown.description &&
                            <div className='description'>
                                {infoDoctor.Markdown.description}
                            </div>
                        }
                    </div>
                </div>
                <div className='schedule-info-doctor row my-3'>
                    <div className='content-right-info-schedule-doctor col-7'>
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
                                        time.isSeleted
                                            ?
                                            <span key={index} onClick={() => this.handleClickPickTime(index)} className="badge time-element bg-primary">{time.timeData.valueVi}</span>
                                            :
                                            <span key={index} onClick={() => this.handleClickPickTime(index)} className="badge time-element ">{time.timeData.valueVi}</span>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className='content-left-info-schedule-doctor col-5'>

                    </div>
                </div>
                <hr />
                <div className='markdown-detail-doctor-content my-5'>
                    {infoDoctor && infoDoctor.Markdown &&
                        <Markup markup={infoDoctor.Markdown.contentHTML} />
                    }
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        infoDoctor: state.user.infoDoctor
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Information);
