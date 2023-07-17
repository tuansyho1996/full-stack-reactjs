import React, { Component } from 'react';
import { connect } from 'react-redux';
import './VerifyBookingEmail.scss'
import Header from '../HomePage/Header';
import queryString from 'query-string';
import * as userAction from '../../store/actions';


class VerifyBookingEmail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isVerifyBookingEmail: false
        }
    }
    componentDidMount() {
        let { token, doctorId } = queryString.parse(this.props.location.search)
        // console.log('check didmount', token, doctorId);
        this.props.fetchVerifyBookingEmail(token, doctorId)
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.isVerifyBookingEmail !== this.props.isVerifyBookingEmail) {
            this.setState({
                isVerifyBookingEmail: this.props.isVerifyBookingEmail
            })
        }
    }
    render() {
        return (
            <React.Fragment>
                <Header
                    isBanner={false}
                />
                {
                    this.state.isVerifyBookingEmail
                        ?
                        <div className='status-comfirm-book-email my-5 text-primary '>Xác nhận email thành công</div>
                        :
                        <div className='status-comfirm-book-email my-5 text-danger'>Xác nhận email không thành công</div>
                }
            </React.Fragment>

        );
    }

}

const mapStateToProps = state => {
    return {
        isVerifyBookingEmail: state.user.isVerifyBookingEmail
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchVerifyBookingEmail: (token, doctorId) => dispatch(userAction.fetchVerifyBookingEmailStart(token, doctorId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyBookingEmail);
