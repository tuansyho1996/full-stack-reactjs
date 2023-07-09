import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import UserManage from '../containers/System/UserManage';
import UserRedux from '../containers/System/Admin/UserRedux';
import DoctorManageRedux from '../containers/System/Admin/DoctorManageRedux';
import ScheduleDoctorManage from '../containers/System/Doctor/ScheduleDoctorManage';
import RegisterPackageGroupOrAcc from '../containers/System/RegisterPackageGroupOrAcc';
import Header from '../containers/Header/Header';
import testRedux from '../containers/System/Admin/testRedux';


class System extends Component {
    render() {
        const { systemMenuPath } = this.props;
        return (
            <React.Fragment>
                {this.props.isLoggedIn && <Header />}
                <div className="system-container">
                    <div className="system-list">
                        <Switch>
                            <Route path="/system/user-manage" component={UserManage} />
                            <Route path="/system/test-redux" component={testRedux} />
                            <Route path="/system/user-redux-manage" component={UserRedux} />
                            <Route path="/system/doctor-manage" component={DoctorManageRedux} />
                            <Route path="/system/doctor-schedule-manage" component={ScheduleDoctorManage} />
                            <Route component={() => { return (<Redirect to={systemMenuPath} />) }} />
                        </Switch>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        systemMenuPath: state.app.systemMenuPath,
        isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
