import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Information.scss'
import * as userAction from '../../../store/actions';
import { fetchTimeSchedule } from '../../../services/userService';
import moment from 'moment/moment';
import _ from 'lodash'

const parser = new DOMParser();


class Information extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // infoDoctor: {},
        }
    }
    // componentDidUpdate(prevProps, prevState) {
    //     if (prevProps.infoDoctor !== this.props.infoDoctor) {
    //         this.setState({
    //             infoDoctor: this.props.infoDoctor
    //         })
    //     }
    // }

    render() {
        let { infoDoctor } = this.props;
        // console.log('check state infodoctor infomation', )
        return (
            <div className='infomation-detail-doctor-container'>
                {this.props.isBreadcrumb &&
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><i className="fas fa-home"></i></li>
                            <li className="breadcrumb-item">Library</li>
                            <li className="breadcrumb-item ">Data</li>
                        </ol>
                    </nav>
                }
                <div className='info-doctor-content row'>
                    <div className='avartar-doctor col-2'>
                        {!_.isEmpty(infoDoctor) !== 0 &&
                            <div className='bg-image' style={{ backgroundImage: `url(${infoDoctor.image})` }}></div>
                        }
                    </div>
                    <div className='description-doctor col-8'>
                        {
                            !_.isEmpty(infoDoctor) !== 0 && infoDoctor.firstName && infoDoctor.lastName &&
                            <h2 className='title-doctor'>{infoDoctor.firstName}&nbsp;{infoDoctor.lastName}</h2>
                        }
                        {infoDoctor && infoDoctor.Markdown && infoDoctor.Markdown.description &&
                            <div className='description'>
                                {infoDoctor.Markdown.description}
                            </div>
                        }
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        // infoDoctor: state.user.infoDoctor
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Information);
