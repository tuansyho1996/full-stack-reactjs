import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserRedux.scss'
import * as adminActions from '../../../store/actions';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import TableUserRedux from './TableUserRedux';
import { ToastContainer, toast } from 'react-toastify';
import { action } from '../../../utils/constant';
import { CommonUtils } from '../../../utils';


class UserRedux extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phonenumber: '',
            address: '',
            gender: '',
            role: '',
            position: '',
            arrGender: [],
            arrRole: [],
            arrPosition: [],
            file: '',
            previewImg: '',
            avatar: '',
            isOpen: false,
            statusAction: action.CREATE,
            idEdit: ''
        }
    }

    componentDidMount() {
        this.props.fetchGenderStartRedux();
        this.props.fetchRoleStart();
        this.props.fetchPositionStart();

    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.arrGender !== this.props.arrGender) {
            this.setState({
                arrGender: this.props.arrGender,
                gender: this.props.arrGender[0].keyMap
            })
        }
        if (prevProps.arrRole !== this.props.arrRole) {
            this.setState({
                arrRole: this.props.arrRole,
                role: this.props.arrRole[0].keyMap
            })
        }
        if (prevProps.arrPosition !== this.props.arrPosition) {
            this.setState({
                arrPosition: this.props.arrPosition,
                position: this.props.arrPosition[0].keyMap
            })
        }
        if (prevProps.listUsers !== this.props.listUsers) {
            let { arrGender, arrPosition, arrRole } = this.state
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                phonenumber: '',
                address: '',
                gender: arrGender && arrGender.length > 0 ? arrGender[0].keyMap : '',
                role: arrRole && arrRole.length > 0 ? arrRole[0].keyMap : '',
                position: arrPosition && arrPosition.length > 0 ? arrPosition[0].keyMap : '',
                avatar: '',
                previewImg: '',
                statusAction: action.CREATE
            })
        }

    }
    handleOnChangeFlieImage = async (event) => {
        let data = event.target.files;
        let file = data[0]
        const objectUrl = URL.createObjectURL(file);
        let fileBase64 = await CommonUtils.toBase64(file);
        this.setState({
            previewImg: objectUrl,
            avatar: fileBase64
        })
        // console.log('check file base 64', fileBase64);

    }
    handleClickPreviewImage = () => {
        if (!this.state.previewImg) return;
        this.setState({
            isOpen: true
        })
    }
    handleChangeInput = (event, id) => {
        let copyState = { ...this.state };
        copyState[id] = event.target.value
        this.setState({
            ...copyState
        })
    }
    handleClickSave = (event) => {
        event.preventDefault();
        if (this.state.statusAction === action.CREATE) {
            this.props.createNewUserStart({
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                phonenumber: this.state.phonenumber,
                address: this.state.address,
                gender: this.state.gender,
                role: this.state.role,
                position: this.state.position,
                avatar: this.state.avatar
            })
        }
        if (this.state.statusAction === action.EDIT) {
            this.props.editUserReduxStart({
                id: this.state.idEdit,
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                phonenumber: this.state.phonenumber,
                address: this.state.address,
                gender: this.state.gender,
                role: this.state.role,
                image: this.state.previewImg,
                position: this.state.position,
            })
        }


    }
    editUser = (user) => {
        let imageBase64 = ''
        if (user.image) {
            imageBase64 = new Buffer(user.image, 'base64').toString('binary');
        }
        this.setState({
            statusAction: action.EDIT,
            email: user.email,
            password: user.password,
            firstName: user.firstName,
            lastName: user.lastName,
            phonenumber: user.phonenumber,
            address: user.address,
            gender: user.gender,
            role: user.roleId,
            position: user.positionId,
            avatar: imageBase64,
            previewImg: imageBase64,
            idEdit: user.id
        })
    }
    render() {
        let { role, position, gender, statusAction, arrGender, arrRole, arrPosition, previewImg, isOpen, email, password, firstName, lastName, phonenumber, address, } = this.state
        console.log('check arr gender', this.props.arrGender)
        return (
            <React.Fragment>
                <div className="text-center mt-4" >
                    <h2 className='title-user-redux'>MANAGE USER REDUX WITH ME</h2>
                    {this.props.isLoadingGender ? <h2>LOADING GENDER</h2> : ''}
                    {this.props.arrGender.length === 0 ? <span>empty array</span> : <span>array not empty</span>}
                </div>
                <div className='form-create-new-user-redux container mt-5'>
                    <form className='mb-5'>
                        <div className="form-row">
                            <div className="form-group col-md-3">
                                <label htmlFor="inputEmail4"><FormattedMessage id='manage-user.email' /></label>
                                <input disabled={statusAction === action.EDIT ? true : false} value={email} onChange={(event) => this.handleChangeInput(event, 'email')} type="email" className="form-control" id="inputEmail4" placeholder="Email" />
                            </div>
                            <div className="form-group col-md-3">
                                <label htmlFor="inputPassword4"><FormattedMessage id='manage-user.password' /></label>
                                <input disabled={statusAction === action.EDIT ? true : false} value={password} onChange={(event) => this.handleChangeInput(event, 'password')} type="password" className="form-control" id="inputPassword4" placeholder="Password" />
                            </div>
                            <div className="form-group col-md-3">
                                <label htmlFor="inputFirstName"><FormattedMessage id='manage-user.first-name' /></label>
                                <input value={firstName} onChange={(event) => this.handleChangeInput(event, 'firstName')} type="text" className="form-control" id="inputFirstName" placeholder="First Name" />
                            </div>
                            <div className="form-group col-md-3">
                                <label htmlFor="inputLastName"><FormattedMessage id='manage-user.last-name' /></label>
                                <input value={lastName} onChange={(event) => this.handleChangeInput(event, 'lastName')} type="text" className="form-control" id="inputLastName" placeholder="Last Name" />
                            </div>

                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-3">
                                <label htmlFor="inputPhonenumber"><FormattedMessage id='manage-user.phone-number' /></label>
                                <input value={phonenumber} onChange={(event) => this.handleChangeInput(event, 'phonenumber')} type="text" className="form-control" id="inputPhonenumber" placeholder="Phonenumber" />
                            </div>
                            <div className='form-group col-md-9'>
                                <label htmlFor="inputAddress"><FormattedMessage id='manage-user.address' /></label>
                                <input value={address} onChange={(event) => this.handleChangeInput(event, 'address')} type="text" className="form-control" id="inputAddress" placeholder="1234 Main St" />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-3">
                                <label htmlFor="inputGender"><FormattedMessage id='manage-user.gender' /></label>
                                <select value={gender} onChange={(event) => this.handleChangeInput(event, 'gender')} id="inputGender" className="form-control">
                                    {arrGender && arrGender.length !== 0 && arrGender.map((item, index) => {
                                        return (
                                            <option value={item.keyMap} keyMap={index}>{this.props.language === 'vi' ? item.valueVi : item.valueEn}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className="form-group col-md-3">
                                <label htmlFor="inputRole"><FormattedMessage id='manage-user.role' /></label>
                                <select value={role} onChange={(event) => this.handleChangeInput(event, 'role')} id="inputRole" className="form-control">
                                    {arrRole && arrRole.length !== 0 &&
                                        arrRole.map((item, index) => {

                                            return (
                                                <option value={item.keyMap} keyMap={index}>
                                                    {
                                                        this.props.language === 'vi' ? item.valueVi : item.valueEn
                                                    }
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className="form-group col-md-3">
                                <label htmlFor="inputPosition"><FormattedMessage id='manage-user.position' /></label>
                                <select value={position} onChange={(event) => this.handleChangeInput(event, 'position')} id="inputPosition" className="form-control">
                                    {
                                        arrPosition && arrPosition.length !== 0 &&
                                        arrPosition.map((item, index) => {
                                            return (
                                                <option value={item.keyMap} keyMap={index}>
                                                    {
                                                        this.props.language === 'vi' ? item.valueVi : item.valueEn
                                                    }
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className="form-group col-md-3 upload-image-container">
                                <label htmlFor="inputAvatar"><FormattedMessage id='manage-user.avatar' /></label>
                                <input onChange={(event) => this.handleOnChangeFlieImage(event)} type="file" className="form-control" id="inputAvatar" hidden />
                                <div>
                                    <label htmlFor="inputAvatar">
                                        <i className="fas fa-upload" ></i>
                                    </label>
                                    <div
                                        style={{
                                            backgroundImage: `url(${previewImg})`,
                                            backgroundPosition: 'center',
                                            backgroundSize: 'contain',
                                            backgroundRepeat: 'no-repeat'
                                        }}
                                        className='preview-image'
                                        onClick={() => this.handleClickPreviewImage()}
                                    >
                                    </div>
                                </div>

                            </div>
                        </div>

                        <button onClick={(event) => this.handleClickSave(event)} className="btn btn-primary">
                            {
                                statusAction && statusAction !== action.EDIT ?
                                    <FormattedMessage id='manage-user.create' /> :
                                    <FormattedMessage id='manage-user.save-edit' />
                            }
                        </button>
                    </form>
                    <TableUserRedux
                        statusAction={this.state.statusAction}
                        editUser={this.editUser}
                    />
                </div>
                {isOpen && (
                    <Lightbox
                        mainSrc={previewImg}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    />
                )}
                {/* <ToastContainer /> */}

            </React.Fragment>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        arrGender: state.admin.gender,
        isLoadingGender: state.admin.isLoadingGender,
        arrRole: state.admin.role,
        arrPosition: state.admin.position,
        listUsers: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchGenderStartRedux: () => dispatch(adminActions.fetchGenderStart()),
        fetchRoleStart: () => dispatch(adminActions.fetchRoleStart()),
        fetchPositionStart: () => dispatch(adminActions.fetchPositionStart()),

        createNewUserStart: (data) => dispatch(adminActions.createNewUserStart(data)),

        fetchUser: () => dispatch(adminActions.fetchUsersStart()),

        editUserReduxStart: (user) => dispatch(adminActions.editUserStart(user))


    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
