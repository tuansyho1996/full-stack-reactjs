import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import { getAllUser } from '../../services/userService';
class UserManage extends Component {

    state = {
        users: []
    }

    async componentDidMount() {
        let users = await getAllUser('ALL');
        this.setState({
            users: users
        })
    }


    render() {
        let { users } = this.state;
        console.log(users.user)
        return (
            <div className='mt-5 mx-5'>
                <h1 className='text-center'>TABLE USER WITH ME</h1>
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
                                    <tr>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.email}</td>
                                        <td>{item.address}</td>
                                        <td>
                                            <i class="fas fa-pencil-alt"></i>
                                            <i class="fas fa-trash"></i>
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
