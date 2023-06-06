import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import { getAllUser } from '../../services/userService';
import ModalManageCreateUser from './ModalManageCreateUser';
import { createNewUserService, deleteUser } from '../../services/userService';
import { ToastContainer, toast } from 'react-toastify';
import { emitter } from '../../utils/emitter';

class UserManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            isModal: false,
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
    createNewUser = async (data) => {
        let validateInput = false;
        let arrKeyInput = ['email', 'password', 'firstName', 'lastName', 'address'];
        for (let i = 0; i < arrKeyInput.length; i++) {
            if (!data[arrKeyInput[i]]) {
                validateInput = true;
                toast.error(`Missing ${arrKeyInput[i]}`)
                this.setState({
                    isModal: true
                })
                break;
            }
        }
        if (!validateInput) {
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

    render() {
        let { users, isModal } = this.state;
        return (
            <div className='mt-5 mx-5'>
                <ToastContainer
                    position="top-center"
                    autoClose={5000}
                />

                <ModalManageCreateUser
                    isModal={this.state.isModal}
                    handleUseToggle={this.handleUseToggle}
                    createNewUser={this.createNewUser}
                />
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
                                            <span>
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
