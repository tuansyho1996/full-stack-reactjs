import React, { Component } from 'react';
import { connect } from 'react-redux';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import './Specialty.scss';
import * as userAction from '../../../store/actions';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';



class Specialty extends Component {

    constructor(props) {
        super(props);
        this.state = {
            specialtyHomepage: []
        }
    }

    componentDidMount() {
        this.props.fetchSpecialty('ALL')
    }
    async componentDidUpdate(prevProps, prevState) {
        if (prevProps.specialtyHomepage !== this.props.specialtyHomepage) {
            await this.props.specialtyHomepage.map((item, index) => {
                item.image = new Buffer(item.image, 'base64').toString('binary');
            })
            this.setState({
                specialtyHomepage: this.props.specialtyHomepage
            })
        }
    }
    handleClickElementSpecialty = () => {

    }
    render() {
        let { specialtyHomepage } = this.state
        let settings = this.props.settings;

        return (
            <div className='specialty-container py-5'>
                <div className='specialty-content container'>
                    <div className='specialty-title'>
                        <h2>Chuyên khoa phổ biến </h2> &nbsp;
                        <span>Xem thêm</span>
                    </div>
                    <Slider {...settings}>
                        {
                            specialtyHomepage &&
                            specialtyHomepage.map((item, index) => {
                                return (
                                    <Link to={{
                                        pathname: "/detail-specialty",
                                        search: `?id=${item.id}`,
                                    }}>
                                        <div className='element-specialty' key={index} onClick={() => this.handleClickElementSpecialty()}>
                                            <img src={item.image} />
                                            <span>{item.name}</span>
                                        </div>
                                    </Link>
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
        specialtyHomepage: state.user.specialtyHomepage
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchSpecialty: (id) => dispatch(userAction.fetchSpecialtyStart(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
