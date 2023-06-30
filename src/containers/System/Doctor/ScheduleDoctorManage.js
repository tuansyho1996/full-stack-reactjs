import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
// import './ScheduleDoctorManage.scss'
// import * as adminActions from '../../../store/actions';
// import { toast } from 'react-toastify';

class ScheduleDoctorManage extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
    }
    componentDidUpdate(prevProps, prevState) {

    }


    render() {

        return (
            <div>wellcome schedule doctor manage</div>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleDoctorManage);
