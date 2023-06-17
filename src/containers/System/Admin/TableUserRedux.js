import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as adminActions from '../../../store/actions';


import './TableUserRedux.scss';


class TableUserRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        }
    }
    componentDidMount() {
        this.props.fetchUser();
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.users !== this.props.users) {
            this.setState({
                users: this.props.users
            })
        }
    }
    handleClickDeleteUser = (user) => {
        this.props.deleteUser(user);
    }
    handleClickEditUser = (user) => {
        this.props.editUser(user)
    }
    render() {
        let { users } = this.state;
        console.log('check users redux', this.props.users)
        return (
            <table id="customers" className='mb-5'>
                <tbody>
                    <tr>
                        <th>First name</th>
                        <th>Last name</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Action</th>
                    </tr>
                    {users && users.length > 0 &&
                        users.map((item, index) => {
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
        );
    }

}

const mapStateToProps = state => {
    return {
        users: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUser: () => dispatch(adminActions.fetchUsersStart()),
        deleteUser: (user) => dispatch(adminActions.deleteUserStart(user))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableUserRedux);
