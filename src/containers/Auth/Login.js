import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

import * as actions from "../../store/actions";
import { KeyCodeUtils, LanguageUtils } from "../../utils";

import userIcon from '../../assets/images/user.svg';
import passIcon from '../../assets/images/pass.svg';
import './Login.scss';
import { FormattedMessage } from 'react-intl';

import adminService from '../../services/adminService';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isHidePassword: true
        }
    }

    handleChangeUsername = (event) => {
        this.setState({
            username: event.target.value
        })
    }
    handleChangePassword = (event) => {
        this.setState({
            password: event.target.value
        })
    }
    handleClickLogin = () => {
        console.log('username:', this.state.username, 'password:', this.state.password);
    }
    handleChangeHideShowPassword = () => {
        this.setState({
            isHidePassword: !this.state.isHidePassword
        })
    }
    render() {
        let { username, password, isHidePassword } = this.state;
        return (
            <div className='login-background'>
                <div className='login-container'>
                    <div className='login-content row'>
                        <div className='login-title col-12'>Login</div>
                        <div className='login-input col-12'>
                            <label className='d-block'>Username</label>
                            <input onChange={(event) => { this.handleChangeUsername(event) }} value={username} type='text' placeholder='Enter your username' />
                        </div>
                        <div className='login-input col-12 position-relative'>
                            <label className='d-block'>Password</label>
                            <input onChange={(event) => { this.handleChangePassword(event) }} value={password} type={isHidePassword ? 'password' : 'text'} placeholder='Enter your Password' />
                            <span onClick={() => { this.handleChangeHideShowPassword() }}>
                                {
                                    isHidePassword ?
                                        <i class="fas fa-eye-slash"></i>
                                        :
                                        <i class="fas fa-eye"></i>
                                }
                            </span>
                        </div>
                        <div className='login-btn col-12'>
                            <span onClick={() => { this.handleClickLogin() }}>
                                <button>Login</button>
                            </span>
                        </div>
                        <div className='login-forgot-password col-12' >
                            Forgot password?
                        </div>
                        <div className='login-title-social'>Or sign in with</div>
                        <div className='login-logo-social col-12'>
                            <i className="fab fa-google-plus-g"></i>
                            <i className="fab fa-facebook-f"></i>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        lang: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        adminLoginSuccess: (adminInfo) => dispatch(actions.adminLoginSuccess(adminInfo)),
        adminLoginFail: () => dispatch(actions.adminLoginFail()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
