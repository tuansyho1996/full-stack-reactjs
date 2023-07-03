import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import Select from 'react-select';
import './ScheduleDoctorManage.scss';
import DatePicker from '../../../components/Input/DatePicker';
import * as adminActions from '../../../store/actions';
import _ from 'lodash';
import { toast } from 'react-toastify';
import moment from 'moment';
import { bulkCreateSchedule } from '../../../services/userService';



class ScheduleDoctorManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedDoctor: '',
            date: '',
            arrDoctor: [],
            arrTime: []
        }
    }

    componentDidMount() {
        this.props.fetchDoctorSelect();
        this.props.fetchTimeAllcode('TIME');
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.arrDoctor !== this.props.arrDoctor) {
            let options = [];
            this.props.arrDoctor.map((item, index) => {
                options.push({ value: item.id, label: `${item.firstName} ${item.lastName}` });
            })
            this.setState({
                arrDoctor: options,
            })
        }
        if (prevProps.arrTimeAllcode !== this.props.arrTimeAllcode) {
            let arrTime = this.props.arrTimeAllcode;
            arrTime = arrTime.map(item => {
                item.isSelected = false;
                return item
            })
            console.log('check arrtime', arrTime)
            this.setState({
                arrTime
            })

        }
    }
    handleChangeSelected = (select) => {
        console.log('check select', select);
        this.setState({
            selectedDoctor: select
        })
    }
    handleChangeDate = (e) => {
        this.setState({
            date: e[0],
        })
    }
    handleClickPickTime = (index) => {
        let arrTimeCopy = this.state.arrTime;
        arrTimeCopy[index].isSelected = !arrTimeCopy[index].isSelected;
        this.setState({
            arrTime: arrTimeCopy
        })
    }
    handleClickSubmit = async () => {
        let arrResult = [];
        let { date, selectedDoctor, arrTime } = this.state;
        let timeSelected = arrTime.filter(item => item.isSelected == true);
        let arrCheckValidate = [selectedDoctor, date, timeSelected.length !== 0];
        let arrMessage = ['Missing doctor', 'Missing date', 'Missing time'];
        let isValidate = true;
        for (let i = 0; i < arrCheckValidate.length; i++) {
            if (!arrCheckValidate[i]) {
                toast.error(arrMessage[i]);
                isValidate = false
                break;
            }
        }
        // let formatDate = moment(date).format("DD/MM/YYYY");
        let formatDate = Date.parse(date)
        timeSelected.map(time => {
            let obj = {};
            obj.doctorId = selectedDoctor.value;
            obj.date = formatDate;
            obj.timeType = time.keyMap;
            arrResult.push(obj);
        })
        if (isValidate) {
            let res = await bulkCreateSchedule({
                arrSchedule: arrResult
            })
            console.log('check create bulk schedule', res)
        }
    }
    render() {
        let { date, selectedDoctor, arrDoctor, arrTime } = this.state
        return (
            <div>
                <h3 className='title-schedule-manage my-5 text-uppercase text-center font-weight-bold'>quản lý kế hoạch khám bệnh của bác sĩ</h3>
                <div className='doctor-schedule-manage-container row mx-2'>
                    <div className='schedule-manage-doctor-select col-6 form-group'>
                        <label>Chọn bác sĩ</label>
                        {arrDoctor &&
                            <Select
                                value={selectedDoctor}
                                onChange={this.handleChangeSelected}
                                options={arrDoctor}
                            />
                        }

                    </div>
                    <div className='schedule-manage-doctor-pick-date col-6 form-group'>
                        <label>Chọn ngày</label>
                        <DatePicker className='form-control' onChange={(e) => this.handleChangeDate(e)} value={date} />
                    </div>
                    <div className='schedule-manage-doctor-pick-time col-12'>
                        {
                            arrTime && arrTime.length !== 0 &&
                            arrTime.map((item, index) => {
                                return (
                                    item.isSelected ?
                                        <span className="badge time-pick-element bg-primary" key={index}
                                            onClick={() => this.handleClickPickTime(index)}
                                        >
                                            {item.valueVi}
                                        </span>
                                        :
                                        <span className="badge time-pick-element " key={index}
                                            onClick={() => this.handleClickPickTime(index)}
                                        >
                                            {item.valueVi}
                                        </span>
                                )
                            })
                        }
                    </div>
                    <button className='btn btn-primary m-3 px-3' onClick={() => this.handleClickSubmit()}>Submit</button>
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        arrDoctor: state.admin.doctorSelects,
        arrTimeAllcode: state.admin.arrTimeAllcode
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchDoctorSelect: () => dispatch(adminActions.fetchDoctorSelectStart()),
        fetchTimeAllcode: (type) => dispatch(adminActions.fetchTimeAllcodeStart(type))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleDoctorManage);
