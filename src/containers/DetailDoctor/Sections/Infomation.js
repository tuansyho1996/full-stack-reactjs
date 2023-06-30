import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Information.scss'
import * as userAction from '../../../store/actions';
const parser = new DOMParser();


class Information extends Component {
    constructor(props) {
        super(props);
        this.state = {
            infoDoctor: {}
        }
    }
    componentDidMount() {

    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.infoDoctor !== this.props.infoDoctor) {
            console.log('check info doctor props information', this.props.infoDoctor)
            this.setState({
                infoDoctor: this.props.infoDoctor
            })
        }
    }
    render() {
        let { infoDoctor } = this.state;

        return (
            <div className='infomation-detail-doctor-container'>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><i className="fas fa-home"></i></li>
                        <li className="breadcrumb-item">Library</li>
                        <li className="breadcrumb-item ">Data</li>
                    </ol>
                </nav>
                <div className='info-doctor-content row'>
                    <div className='avartar-doctor col-2'>
                        {Object.keys(infoDoctor).length !== 0 &&
                            <div className='bg-image' style={{ backgroundImage: `url(${infoDoctor.image})` }}></div>
                        }
                    </div>
                    <div className='description-doctor col-6'>
                        {
                            Object.keys(infoDoctor).length !== 0 && infoDoctor.firstName && infoDoctor.lastName &&
                            <h2 className='title-doctor'>{infoDoctor.firstName}&nbsp;{infoDoctor.lastName}</h2>
                        }
                        {infoDoctor && infoDoctor.Markdown && infoDoctor.Markdown.description &&
                            <div className='description'>
                                {infoDoctor.Markdown.description}
                            </div>
                        }
                    </div>
                </div>
                <div className='schedule-info-doctor row my-3'>
                    <div className='schedule col-7'>
                        <select class="form-select form-select-lg mb-3" aria-label=".form-select-lg example">
                            <option selected>Open this select menu</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </select>
                        <div className='title-schedule'>
                            <i className="fas fa-home"></i>
                            Lịch khám
                        </div>
                    </div>
                    <div className='info col-5'>

                    </div>
                </div>
                <hr />
                <div className='markdown-detail-doctor-content'>

                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        infoDoctor: state.user.infoDoctor
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Information);
