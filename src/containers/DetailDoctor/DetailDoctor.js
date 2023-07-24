import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as userAction from '../../store/actions';
import Header from './Header/Header';
import Infomation from './Sections/Infomation';
import { Markup } from "react-render-markup";
import ChooseScheduleAndInfoDoctor from './Sections/ChooseScheduleAndInfoDoctor';



class DetailDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            infoDoctor: {}
        }
    }
    componentDidMount() {
        this.props.fetchDetailDoctor(this.props.match.params.id);
    }
    async componentDidUpdate(prevProps, prevState) {
        if (prevProps.infoDoctor !== this.props.infoDoctor) {
            this.setState({
                infoDoctor: this.props.infoDoctor
            })
        }
    }
    render() {
        let { infoDoctor } = this.state;
        return (
            <div className=''>
                <Header
                    infoDoctor={infoDoctor}
                />
                <div className='container-section container'>
                    <Infomation
                        infoDoctor={infoDoctor}
                        isbreadcrumb={true}
                    />
                    <ChooseScheduleAndInfoDoctor
                        paramsId={this.props.match.params.id}
                        isRow={true}
                    />
                    <hr />
                    <div className='markdown-detail-doctor-content my-5'>
                        {infoDoctor && infoDoctor.Markdown &&
                            <Markup markup={infoDoctor.Markdown.contentHTML} />
                        }
                    </div>
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
        fetchDetailDoctor: (id) => dispatch(userAction.fetchDetailDoctorStart(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
