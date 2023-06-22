import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import {
    Button, Modal, ModalHeader, ModalBody, ModalFooter,

} from 'reactstrap';
import './ModalManageCreateUser.scss';

class ModalManageEditUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
        }
    }

    componentDidMount() {
        let data = this.props.userCurrentEdit
        this.setState({
            id: data.id,
            email: data.email,
            password: '123456789',
            firstName: data.firstName,
            lastName: data.lastName,
            address: data.address
        })
    }

    toggle() {
        this.props.handleUseToggleModalEditUser()
    }
    handleChangeInput = (event, id) => {
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })
    }

    

    clickSaveChange = () => {
        let data = {
            id: this.state.id,
            email: this.state.email,
            password: this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            address: this.state.address,
            phonenumber: this.state.phonenumber,
            gender: this.state.gender,
            role: this.state.role,
        }
        this.props.handleSaveChangeUser(data)
        this.toggle()
    }
    render() {
        let { email, password, firstName, lastName, address } = this.state;
        return (
            <div className='modal'>
                <Button color="danger" onClick={() => this.toggle()}>{this.props.buttonLabel}</Button>
                <Modal size='lg' isOpen={this.props.isModalEditUser} toggle={() => this.toggle()} className={this.props.className}>
                    <ModalHeader toggle={() => this.toggle()}>Edit New User</ModalHeader>
                    <ModalBody>
                        <form className='form-create-new-user'>
                            <div className='row-container'>
                                <div className='email-input input'>
                                    <label className="form-label">Email</label>
                                    <input value={email} onChange={(event) => this.handleChangeInput(event, 'email')} aria-describedby="default input example" type="text" className="form-control" disabled />
                                </div>
                                <div className='password-input input'>
                                    <label className="form-label">Password</label>
                                    <input value={password} onChange={(event) => this.handleChangeInput(event, 'password')} aria-describedby="default input example" type="password" className="form-control" disabled />
                                </div>
                            </div>
                            <div className='row-container'>
                                <div className='first-name-input input'>
                                    <label className="form-label">First name</label>
                                    <input value={firstName} onChange={(event) => this.handleChangeInput(event, 'firstName')} aria-describedby="default input example" type="text" className="form-control" />
                                </div>
                                <div className='last-name-input input'>
                                    <label className="form-label">Last name</label>
                                    <input value={lastName} onChange={(event) => this.handleChangeInput(event, 'lastName')} aria-describedby="default input example" type="text" className="form-control" />
                                </div>
                            </div>
                            <div className='row-container'>
                                <div className='address-input input'>
                                    <label className="form-label">Address</label>
                                    <input value={address} onChange={(event) => this.handleChangeInput(event, 'address')} aria-describedby="default input example" type="text" className="form-control" />
                                </div>
                            </div>
                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={() => this.clickSaveChange()}>Save change</Button>{' '}
                    </ModalFooter>
                </Modal>
            </div>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalManageEditUser);
