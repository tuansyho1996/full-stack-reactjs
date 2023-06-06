import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import {
    Button, Modal, ModalHeader, ModalBody, ModalFooter,

} from 'reactstrap';
import './ModalManageCreateUser.scss';
import { emitter } from '../../utils/emitter';
class ModalManageCreateUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
        }
        this.listenToEmitter();
    }

    listenToEmitter() {
        emitter.on('CLEAR DATA MODAL', () => {
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                address: '',
            })
        })
    }

    componentDidMount() {
    }

    toggle() {
        this.props.handleUseToggle()
    }
    handleChangeInput = (event, id) => {
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })
    }

    createNewUser = () => {
        let data = {
            email: this.state.email,
            password: this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            address: this.state.address,
            phonenumber: this.state.phonenumber,
            gender: this.state.gender,
            role: this.state.role,
        }
        this.props.createNewUser(data)
        this.toggle()
    }
    render() {
        let { email, password, firstName, lastName, address } = this.state;
        return (
            <div className='modal'>
                <Button color="danger" onClick={() => this.toggle()}>{this.props.buttonLabel}</Button>
                <Modal size='lg' isOpen={this.props.isModal} toggle={() => this.toggle()} className={this.props.className}>
                    <ModalHeader toggle={() => this.toggle()}>Create New User</ModalHeader>
                    <ModalBody>
                        <form className='form-create-new-user'>
                            <div className='row-container'>
                                <div className='email-input input'>
                                    <label className="form-label">Email</label>
                                    <input value={email} onChange={(event) => this.handleChangeInput(event, 'email')} aria-describedby="default input example" type="text" className="form-control" />
                                </div>
                                <div className='password-input input'>
                                    <label className="form-label">Password</label>
                                    <input value={password} onChange={(event) => this.handleChangeInput(event, 'password')} aria-describedby="default input example" type="text" className="form-control" />
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
                        <Button color="primary" onClick={() => this.createNewUser()}>Create</Button>{' '}
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalManageCreateUser);
