import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import { getAllUser } from '../../services/userService';
import ModalManageCreateUser from './ModalManageCreateUser';
import ModalManageEditUser from './ModalManageEditUser';
import { createNewUserService, deleteUser, editUserService } from '../../services/userService';
import { ToastContainer, toast } from 'react-toastify';
import { emitter } from '../../utils/emitter';

class UserManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            isModal: false,
            isModalEditUser: false,
            userCurrentEdit: {}
        }
    }

    async componentDidMount() {
        let users = await getAllUser('ALL');
        this.setState({
            users: users
        })
    }

    handleClickNewUser = () => {
        this.setState({
            isModal: !this.state.isModal
        })
    }
    handleUseToggle = () => {
        this.setState({
            isModal: !this.state.isModal
        })
    }
    handleUseToggleModalEditUser = () => {
        this.setState({
            isModalEditUser: !this.state.isModalEditUser
        })
    }
    validateInput = (data) => {
        let isValidateInput = false;
        let arrKeyInput = ['email', 'password', 'firstName', 'lastName', 'address'];
        for (let i = 0; i < arrKeyInput.length; i++) {
            if (!data[arrKeyInput[i]]) {
                isValidateInput = true;
                toast.error(`Missing ${arrKeyInput[i]}`)
                this.setState({
                    isModal: true
                })
                break;
            }
        }
        return isValidateInput
    }
    createNewUser = async (data) => {
        let isValidateInput = this.validateInput(data);
        if (!isValidateInput) {
            console.log('check run ')
            try {
                let response = await createNewUserService(data);
                if (response && response.errorCode !== 0) {
                    this.setState({
                        isModal: false
                    })
                    toast.error(response.message)
                }
                else {
                    let users = await getAllUser('ALL');
                    this.setState({
                        isModal: false,
                        users: users
                    })
                    toast.success(response.message)
                    emitter.emit('CLEAR DATA MODAL')
                }
            }
            catch (e) {
                console.log(e)
            }
        }

    }
    handleClickDeleteUser = async (user) => {
        try {
            let res = await deleteUser(user);
            console.log(res)
            if (res && res.errorCode === 0) {
                let users = await getAllUser('ALL');
                this.setState({
                    users: users
                })
                toast.success(res.message)
            }
            else {
                toast.error(res.message)
            }
        }
        catch (e) {
            console.log(e)
        }
    }
    handleClickEditUser = async (user) => {
        this.setState({
            isModalEditUser: !this.state.isModalEditUser,
            userCurrentEdit: user
        })
    }
    handleSaveChangeUser = async (data) => {
        let isValidateInput = this.validateInput(data);
        if (!isValidateInput) {
            try {
                let res = await editUserService(data);
                if (res && res.errorCode === 0) {
                    toast.success(res.message);
                    let users = await getAllUser('ALL');
                    this.setState({
                        users: users
                    })
                }
            }
            catch (e) {
                console.log(e)
            }
        }
    }

    render() {
        let { users, isModal, isModalEditUser } = this.state;
        return (
            <div className='mt-5 mx-5'>
                <ToastContainer
                    position="top-center"
                    autoClose={1000}
                />

                <ModalManageCreateUser
                    isModal={this.state.isModal}
                    handleUseToggle={this.handleUseToggle}
                    createNewUser={this.createNewUser}
                />

                {isModalEditUser &&
                    <ModalManageEditUser
                        isModalEditUser={this.state.isModalEditUser}
                        userCurrentEdit={this.state.userCurrentEdit}
                        handleUseToggleModalEditUser={this.handleUseToggleModalEditUser}
                        handleSaveChangeUser={this.handleSaveChangeUser}
                    />
                }


                <h1 className='text-center'>TABLE USER WITH ME</h1>
                <div>
                    <button
                        className='btn-outline-none btn-lg btn-primary px-3'
                        onClick={() => this.handleClickNewUser()}
                    >Add new user</button>
                </div>
                <table id="customers" className='mt-3'>
                    <tbody>
                        <tr>
                            <th>First name</th>
                            <th>Last name</th>
                            <th>Email</th>
                            <th>Address</th>
                            <th>Action</th>
                        </tr>
                        {
                            users && users.user &&
                            users.user.map(item => {
                                return (
                                    <tr key={item.id}>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.email}</td>
                                        <td>{item.address}</td>
                                        <td>
                                            <span onClick={() => this.handleClickEditUser(item)}>
                                                <i className="fas fa-pencil-alt"></i>
                                            </span>
                                            <span onClick={() => this.handleClickDeleteUser(item)}>
                                                <i className="fas fa-trash"></i>
                                            </span>
                                        </td>
                                    </tr>
                                )
                            })
                        }

                    </tbody>
                </table>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
