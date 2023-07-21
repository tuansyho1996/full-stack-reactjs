import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter as Router } from 'connected-react-router';
import { history } from '../redux'
import { ToastContainer } from 'react-toastify';


import { userIsAuthenticated, userIsNotAuthenticated } from '../hoc/authentication';

import { path } from '../utils'

import Home from '../routes/Home';
import HomePage from './HomePage/HomePage';
import DetailDoctor from './DetailDoctor/DetailDoctor'
import Login from './Auth/Login';
import System from '../routes/System';
import VerifyBookingEmail from './VerifyBookingEmail/VerifyBookingEmail';
import DetailSpecialty from './DetailSpecialty/DetailSpecialty'

import { CustomToastCloseButton } from '../components/CustomToast';
import CustomScrollbars from '../components/CustomScrollbars'
import ConfirmModal from '../components/ConfirmModal';

class App extends Component {

    handlePersistorState = () => {
        const { persistor } = this.props;
        let { bootstrapped } = persistor.getState();
        if (bootstrapped) {
            if (this.props.onBeforeLift) {
                Promise.resolve(this.props.onBeforeLift())
                    .then(() => this.setState({ bootstrapped: true }))
                    .catch(() => this.setState({ bootstrapped: true }));
            } else {
                this.setState({ bootstrapped: true });
            }
        }
    };

    componentDidMount() {
        this.handlePersistorState();
    }

    render() {
        return (
            <Fragment>
                <Router history={history}>
                    <CustomScrollbars style={{ 'height': '100vh' }}>
                        <div className="main-container">
                            <ConfirmModal />
                            <span className="content-container">
                                <Switch>
                                    <Route path={path.HOME} exact component={(Home)} />
                                    <Route path={path.HOME_PAGE} component={(HomePage)} />
                                    <Route path={path.DETAIL_DOCTOR} component={(DetailDoctor)} />
                                    <Route path={path.DETAIL_SPECIALTY} component={(DetailSpecialty)} />
                                    <Route path={path.VERIFY_BOOKING_EMAIL} component={(VerifyBookingEmail)} />
                                    <Route path={path.LOGIN} component={userIsNotAuthenticated(Login)} />
                                    <Route path={path.SYSTEM} component={userIsAuthenticated(System)} />
                                </Switch>
                            </span>
                            <ToastContainer />
                            {/* {!this.props.isLoggedIn &&
                                <ToastContainer
                                    className="toast-container" toastClassName="toast-item" bodyClassName="toast-item-body"
                                    autoClose={false} hideProgressBar={true} pauseOnHover={false}
                                    pauseOnFocusLoss={true} closeOnClick={false} draggable={false}
                                    closeButton={<CustomToastCloseButton />}
                                />
                            } */}
                        </div>
                    </CustomScrollbars>
                </Router>
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        started: state.app.started,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);