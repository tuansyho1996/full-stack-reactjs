import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu, doctorMenu } from './menuApp';
import { keyRoleId } from '../../utils/constant';
import './Header.scss';
import { languages } from '../../utils/constant';
import { changeLanguage } from '../../store/actions';
import { FormattedMessage } from 'react-intl';



class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            menus: []
        }
    }

    componentDidMount() {
        let menus = []
        if (this.props.userInfo.roleId === keyRoleId.ADMIN) {
            menus = adminMenu
        }
        if (this.props.userInfo.roleId === keyRoleId.DOCTOR) {
            menus = doctorMenu
        }
        this.setState({
            menus: menus
        })
    }

    handleClickChangeLanguage = (language) => {
        this.props.changeLanguageReduxApp(language)
    }

    render() {
        const { processLogout, userInfo } = this.props;

        return (
            <div className="header-container">
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    <Navigator menus={this.state.menus} />
                </div>

                {/* nút logout */}
                <div className='header-right-container'>
                    <span><FormattedMessage id='homeHeader.wellcome' />, {userInfo && userInfo.firstName ? userInfo.firstName : ''}</span>
                    <div className='languages'>
                        <span onClick={() => this.handleClickChangeLanguage(languages.VI)} className='language-vi'>VN</span>
                        <span onClick={() => this.handleClickChangeLanguage(languages.EN)} className='language-en'>EN</span>
                    </div>
                    <div className="btn btn-logout" onClick={processLogout}>
                        <i className="fas fa-sign-out-alt"></i>
                    </div>
                </div>

            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        changeLanguageReduxApp: (language) => dispatch(changeLanguage(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
