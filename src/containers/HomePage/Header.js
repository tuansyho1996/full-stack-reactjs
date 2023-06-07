import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomePage.scss'

class Header extends Component {

    render() {
        return (
            <div className='home-header-container'>
                <div className='home-header-content'>
                    <div className='home-header-left-content'>
                        <i class="fas fa-bars"></i>
                        <div className='home-header-logo'></div>
                    </div>
                    <div className='home-header-center-content'>
                        <div className='option-content'>
                            <div className='option-title'><b>Bác sĩ</b></div>
                            <div className='option-sub-title'>Tìm bác sĩ theo chuyên khoa</div>
                        </div>
                        <div className='option-content'>
                            <div className='option-title'><b>Cơ sở y tế</b></div>
                            <div className='option-sub-title'>Chọn bệnh viện phòng khám</div>
                        </div>
                        <div className='option-content'>
                            <div className='option-title'><b>Bác sĩ</b></div>
                            <div className='option-sub-title'>Chọn bác sĩ giỏi</div>
                        </div>
                        <div className='option-content'>
                            <div className='option-title'><b>Gói khám</b></div>
                            <div className='option-sub-title'>Khám sức khỏe tổng quát</div>
                        </div>
                    </div>
                    <div className='home-header-right-content'>
                        <i class="far fa-question-circle"></i>
                        <span>VN</span>
                    </div>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Header);
