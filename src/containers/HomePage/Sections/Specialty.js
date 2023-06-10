import React, { Component } from 'react';
import { connect } from 'react-redux';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import './Specialty.scss';
import imgMusculoskeletal from '../../../assets/specialty-co-xuong-khop.jpg';
import imgNerve from '../../../assets/specialty-than-kinh.jpg';
import imgDigest from '../../../assets/specialty-tieu-hoa.jpg';
import imgHeart from '../../../assets/specialty-tim-mach.jpg';
import imgSense from '../../../assets/specialty-tai-mui-hong.jpg';
import imgSpine from '../../../assets/specialty-cot-song.jpg';
import imgTraditional from '../../../assets/specialty-y-hoc-co-truyen.jpg';
import imgAcupuncture from '../../../assets/specialty-cham-cuu.jpg';

class Specialty extends Component {

    render() {
        let arrSpecialty = [
            { img: imgMusculoskeletal, title: 'Cơ xương khớp' },
            { img: imgNerve, title: 'Thần kinh' },
            { img: imgDigest, title: 'Tiêu hóa' },
            { img: imgHeart, title: 'Tim mạch' },
            { img: imgSense, title: 'Tai mũi họng' },
            { img: imgSpine, title: 'Cột sống' },
            { img: imgTraditional, title: 'Y học cổ truyền' },
            { img: imgAcupuncture, title: 'Châm cứu' }];
        let arrTitleSpecialty = [, , , , , , ,];
        let settings = {
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 4,
            adaptiveHeight: true
        };
        return (
            <div className='specialty-container'>
                <div className='specialty-content container'>
                    <div className='specialty-title'>
                        <h2>Chuyên khoa phổ biến </h2> &nbsp;
                        <span>Xem thêm</span>
                    </div>
                    <Slider {...settings}>
                        {
                            arrSpecialty &&
                            arrSpecialty.map((item) => {
                                return (
                                    <div>
                                        <img src={item.img} />
                                        <span>{item.title}</span>
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
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
