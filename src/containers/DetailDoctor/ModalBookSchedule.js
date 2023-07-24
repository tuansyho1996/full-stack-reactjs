import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as adminAction from '../../store/actions';
import * as userAction from '../../store/actions';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import _ from 'lodash'
import './ModalBookSchedule.scss'
import moment from 'moment/moment';



class ModalBookSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            infoDoctor: {},
            infoDoctorSchedule: {},
            dateHtml: '',
            arrGender: [],
            firstName: '',
            lastName: '',
            email: '',
            address: '',
            reason: '',
            phonenumber: '',
            gender: 'M'
        }
    }
    componentDidMount() {
        this.props.fetchGender();
        let dateHtml = moment(this.props.timePick.date).format('dddd DD-MM');
        this.setState({
            dateHtml
        })
    }
    async componentDidUpdate(prevProps, prevState) {
        if (prevProps.infoDoctor !== this.props.infoDoctor) {
            this.setState({
                infoDoctor: this.props.infoDoctor
            })
        }
        if (prevProps.gender !== this.props.gender) {
            this.setState({
                arrGender: this.props.gender
            })
        }
    }
    toggleBookSchedule = () => {
        this.props.handleToggleBookSchedule()
    }
    handleClickCreateAppointmentSchedule = async () => {
        await this.props.createAppointmentSchedule({
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            address: this.state.address,
            reason: this.state.reason,
            phonenumber: this.state.phonenumber,
            gender: this.state.gender,
            time: this.props.timePick,
            dateHtml: this.state.dateHtml,
            doctorId: this.state.infoDoctor.id,
            firstNameDoctor: this.state.infoDoctor.firstName,
            lastNameDoctor: this.state.infoDoctor.lastName,
        });
        this.setState({
            firstName: '',
            lastName: '',
            email: '',
            address: '',
            reason: '',
            phonenumber: '',
            gender: 'M',
        })
        this.toggleBookSchedule();
    }
    handleChangeInput = (e, key) => {
        let copyState = this.state;
        copyState[key] = e.target.value;
        this.setState({
            ...copyState
        })
    }
    render() {
        let { infoDoctor, dateHtml, arrGender } = this.state;
        return (
            <Modal isOpen={this.props.isModal} toggle={this.toggleBookSchedule} size='lg'>
                <ModalHeader toggle={this.toggleBookSchedule}>Thông tin đặt lịch khám bệnh</ModalHeader>
                <div className='modal-book-schedule-container mx-2'>
                    <ModalBody>
                        {!_.isEmpty(infoDoctor) && !_.isEmpty(this.props.infoDoctorSchedule) && !_.isEmpty(this.props.timePick) &&
                            < div className='row detail-content-doctor'>
                                <div className='col-2 avatar-doctor' style={{ backgroundImage: `url(${infoDoctor.image})` }}></div>
                                <div className='col-9 description-doctor'>{infoDoctor.Markdown.description}</div>
                                <div className='date-pick font-weight-bold col-5 my-2'>Ngày:
                                    <span className='font-weight-normal'>
                                        &nbsp;{dateHtml}&nbsp;&nbsp;
                                    </span>
                                </div>
                                <div className='time-pick font-weight-bold col my-2'>Khung giờ:
                                    <span className='font-weight-normal'>
                                        &nbsp;{this.props.timePick.timeData.valueVi}&nbsp;&nbsp;
                                    </span>
                                </div>
                                <div className='price-doctor font-weight-bold col-12'>
                                    Giá khám:
                                    <span className='font-weight-normal'>
                                        &nbsp;{this.props.infoDoctorSchedule.priceData.valueVi}
                                        <sup>đ</sup>
                                    </span>
                                </div>
                            </div>
                        }
                        <div className='patient-infomation-input row'>
                            <div className="form-group col-6">
                                <label htmlFor="firstName">Họ</label>
                                <input type="text" className="form-control" id="firstName" placeholder="Họ"
                                    value={this.state.firstName}
                                    onChange={(e) => this.handleChangeInput(e, 'firstName')}
                                />
                            </div>
                            <div className="form-group col-6">
                                <label htmlFor="lastName">Tên</label>
                                <input type="text" className="form-control" id="lastName" placeholder="Tên"
                                    value={this.state.lastName}
                                    onChange={(e) => this.handleChangeInput(e, 'lastName')}
                                />
                            </div>
                            <div className="form-group col-6">
                                <label htmlFor="email">Email address</label>
                                <input type="email" className="form-control" id="email" placeholder="Email address"
                                    value={this.state.email}
                                    onChange={(e) => this.handleChangeInput(e, 'email')}
                                />
                            </div>
                            <div className="form-group col-6">
                                <label htmlFor="address">Địa chỉ liên hệ</label>
                                <input type="text" className="form-control" id="address" placeholder="Địa chỉ liên hệ"
                                    value={this.state.address}
                                    onChange={(e) => this.handleChangeInput(e, 'address')}
                                />
                            </div>
                            <div className="form-group col-12">
                                <label htmlFor="reason">Lý do khám</label>
                                <input type="text" className="form-control" id="reason" placeholder="Lý do khám"
                                    value={this.state.reason}
                                    onChange={(e) => this.handleChangeInput(e, 'reason')}
                                />
                            </div>
                            <div className="form-group col-6">
                                <label htmlFor="phonenumber">Số điện thoại</label>
                                <input type="text" className="form-control" id="phonenumber" placeholder="Số điện thoại"
                                    value={this.state.phonenumber}
                                    onChange={(e) => this.handleChangeInput(e, 'phonenumber')}
                                />
                            </div>
                            <div className="form-group col-6">
                                <label htmlFor="gender">Giới tính</label>
                                <select className="form-select form-control" aria-label="Default select example"
                                    onChange={(e) => this.handleChangeInput(e, 'gender')}
                                    value={this.state.gender}
                                >
                                    {arrGender && arrGender.length !== 0 &&
                                        arrGender.map((item, index) => {
                                            return (
                                                <option key={index} value={item.keyMap}>{item.valueVi}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                    </ModalBody>
                </div >
                <ModalFooter>
                    <Button color="primary px-2" onClick={this.handleClickCreateAppointmentSchedule}>
                        Xác nhận
                    </Button>
                    <Button color="secondary px-2" onClick={this.toggleBookSchedule}>
                        Hủy
                    </Button>
                </ModalFooter>

            </Modal >
        );
    }

}

const mapStateToProps = state => {
    return {
        infoDoctor: state.user.infoDoctor,
        gender: state.admin.gender
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchGender: () => dispatch(adminAction.fetchGenderStart()),
        createAppointmentSchedule: (data) => dispatch(userAction.createAppointmentScheduleStart(data))

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalBookSchedule);
