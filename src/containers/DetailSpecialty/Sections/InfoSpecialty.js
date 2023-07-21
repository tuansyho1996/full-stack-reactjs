import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
// import * as userAction from '../../store/actions';
// import './InfoSpecialty.scss';
import queryString from 'query-string';
import _ from 'lodash';
import { Markup } from "react-render-markup";





class InfoSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    componentDidMount() {


    }
    async componentDidUpdate(prevProps, prevState) {

    }
    render() {
        let { detailSpecialty } = this.props
        return (
            <Fragment>
                {!_.isEmpty(detailSpecialty) && detailSpecialty.name && detailSpecialty.descriptionHTML &&
                    <div className='detail-specialty-container '>
                        <div className='detail-specialty-content container pb-3'>
                            <div className='detail-specialty-title py-3'>{detailSpecialty.name}</div>
                            <div className='detail-specialty-descriptionHTML'>
                                <Markup markup={detailSpecialty.descriptionHTML} />
                            </div>
                        </div>
                    </div>
                }
            </Fragment>
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

export default connect(mapStateToProps, mapDispatchToProps)(InfoSpecialty);
