import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Header.scss'
import { FormattedMessage } from 'react-intl';
import { languages } from '../../utils/constant';
import { changeLanguage } from '../../store/actions';



class Header extends Component {


    handleClickChangeLanguage = (language) => {
        // console.log('check click change language', language)
        this.props.changeLanguageAppRedux(language)
    }

    render() {
        let { language } = this.props
        return (
            <React.Fragment>
                <div className='home-header-container'>
                    <div className='home-header-content'>
                        <div className='home-header-left-content'>
                            <i className="fas fa-bars"></i>
                            <div className='home-header-logo'></div>
                        </div>
                        <div className='home-header-center-content'>
                            <div className='option-content'>
                                <div className='option-title'><b><FormattedMessage id='homeHeader.speciality' /></b></div>
                                <div className='option-sub-title'><FormattedMessage id='homeHeader.searchdoctor' /></div>
                            </div>
                            <div className='option-content'>
                                <div className='option-title'><b><FormattedMessage id='homeHeader.health-facility' /></b></div>
                                <div className='option-sub-title'><FormattedMessage id='homeHeader.select-room' /></div>
                            </div>
                            <div className='option-content'>
                                <div className='option-title'><b><FormattedMessage id='homeHeader.doctor' /></b></div>
                                <div className='option-sub-title'><FormattedMessage id='homeHeader.select-doctor' /></div>
                            </div>
                            <div className='option-content'>
                                <div className='option-title'><b><FormattedMessage id='homeHeader.fee' /></b></div>
                                <div className='option-sub-title'><FormattedMessage id='homeHeader.check-health' /></div>
                            </div>
                        </div>
                        <div className='home-header-right-content'>
                            <div className='header-support'>
                                <i className="far fa-question-circle"></i>
                                <span><FormattedMessage id='homeHeader.support' /></span>
                            </div>
                            <span className={language === languages.VI ? `language active` : 'language'} onClick={() => { this.handleClickChangeLanguage(languages.VI) }}>VN</span>
                            <span className={language === languages.EN ? `language active` : 'language'} onClick={() => { this.handleClickChangeLanguage(languages.EN) }}>EN</span>
                        </div>
                    </div>
                </div>
                <div className='home-banner-container'>
                    <div className='banner-content'>
                        <div className='banner-title-1'><FormattedMessage id='homeHeader.title1' /></div>
                        <div className='banner-title-2'><FormattedMessage id='homeHeader.title2' /></div>
                        <div className='banner-search'>
                            <i className="fas fa-search"></i>
                            <input />
                        </div>
                        <div className='banner-option'>
                            <div className='option-element'>
                                <div className='container-logo-option'>
                                    <i className="fas fa-hospital"></i>
                                </div>
                                <div className='option-title'>Khám <br /> chuyên khoa</div>
                            </div>
                            <div className='option-element'>
                                <div className='container-logo-option'>
                                    <i className="fas fa-phone"></i>
                                </div>
                                <div className='option-title'>Khám<br /> từ xa</div>
                            </div>
                            <div className='option-element'>
                                <div className='container-logo-option'>
                                    <i className="fas fa-notes-medical"></i>
                                </div>
                                <div className='option-title'>Khám<br /> tổng quát</div>
                            </div>
                            <div className='option-element'>
                                <div className='container-logo-option'>
                                    <i className="fas fa-ambulance"></i>
                                </div>
                                <div className='option-title'>Sản phẩm <br />y tế</div>
                            </div>
                            <div className='option-element'>
                                <div className='container-logo-option'>
                                    <i className="fas fa-toolbox"></i>
                                </div>
                                <div className='option-title'>Khám<br /> nha khoa</div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>

        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageAppRedux: (language) => dispatch(changeLanguage(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
