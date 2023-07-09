import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as adminActions from '../../../store/actions';


// import './testRedux.scss';


class testRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gender: []
        }
    }
    componentDidMount() {
        this.props.fetchGenderStartRedux()
    }
    componentDidUpdate(prevProps, prevState) {
        // if (prevProps.arrGender !== this.props.arrGender) {
        //     this.setState({
        //         gender: this.props.arrGender
        //     })
        // }
    }

    render() {
        console.log('check arr props gender', this.props.arrGender);
        // console.log('check arr state gender', this.state.gender);

        return (
            <div>hi</div>
        );
    }

}

const mapStateToProps = state => {
    return {
        arrGender: state.admin.gender,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchGenderStartRedux: () => dispatch(adminActions.fetchGenderStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(testRedux);
