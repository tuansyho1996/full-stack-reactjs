import React, { Component } from 'react';
import { connect } from 'react-redux';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import './OutstandingDoctor.scss';
import * as userAction from '../../../store/actions';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';




class OutstandingDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrTopDoctors: []
        }
    }


    async componentDidMount() {
        await this.props.fetchTopDoctorHomepageStartRedux(7);
        let imageBase64 = ''
        if (this.props.topDoctors) {
            await this.props.topDoctors.map((item, index) => {
                item.image = new Buffer(item.image, 'base64').toString('binary');
            })
        }
        this.setState({
            arrTopDoctors: this.props.topDoctors
        })
    }
    handleClickTopDoctor = (user) => {

    }

    render() {
        let arrTopDoctors = this.props.topDoctors;
        let settings = this.props.settings;
        console.log('check props setting', this.props.settings)
        return (
            <div className='outstandingDoctor-container'>
                <div className='outstandingDoctor-content container'>
                    <div className='outstandingDoctor-title mb-5'>
                        <h2><FormattedMessage id='section.outstanding-doctor' /></h2> &nbsp;
                        <span>Xem thêm</span>
                    </div>
                    <Slider {...settings}>
                        {
                            arrTopDoctors && arrTopDoctors.length > 0 &&
                            arrTopDoctors.map((item, index) => {
                                return (
                                    <div className='outstandingDoctor-element' key={index}>
                                        <Link
                                            to={{
                                                pathname: `/detail-doctor/${item.id}`,
                                            }} >
                                            <div className='img-top-doctor' >
                                                <div className='bg-img-top-doctor'
                                                    style={{ backgroundImage: `url(${item.image})` }}
                                                    onClick={() => this.handleClickTopDoctor(item)}
                                                ></div>
                                            </div>
                                        </Link>
                                        <div className='text-uppercase mt-2 text-center'>{item.firstName} &nbsp; {item.lastName}</div>
                                    </div>
                                )
                            })
                        }
                    </Slider>

                </div>


            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        topDoctors: state.user.topDoctors
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchTopDoctorHomepageStartRedux: (limit) => dispatch(userAction.fetchTopDoctorHomepageStart(limit))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OutstandingDoctor);
