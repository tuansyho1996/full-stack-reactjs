import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Information.scss'
import * as userAction from '../../../store/actions';


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

    }
    render() {
        return (
            <div className='infomation-detail-doctor-container'>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><i className="fas fa-home"></i></li>
                        <li className="breadcrumb-item">Library</li>
                        <li className="breadcrumb-item ">Data</li>
                    </ol>
                </nav>
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

export default connect(mapStateToProps, mapDispatchToProps)(Information);
