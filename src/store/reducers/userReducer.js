import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoggedIn: false,
    userInfo: null,
    topDoctors: [],
    infoDoctor: {},
    infoDoctorSchedule: {},
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.USER_LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                userInfo: action.userInfo
            }
        case actionTypes.USER_LOGIN_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                userInfo: null
            }
        case actionTypes.PROCESS_LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                userInfo: null
            }
        //FETCH TOP DOCTOR HOMEPAGE
        case actionTypes.ADMIN_FETCH_TOP_DOCTOR_HOMEPAGE_SUCCESS:
            state.topDoctors = action.res;
            return {
                ...state,
            }
        case actionTypes.ADMIN_FETCH_TOP_DOCTOR_HOMEPAGE_FAIL:
            return {
                ...state,
            }
        //FETCH DETAIL DOCTOR
        case actionTypes.USER_FETCH_DETAIL_DOCTOR_SUCCESS:
            state.infoDoctor = action.res;
            return {
                ...state,
            }
        case actionTypes.USER_FETCH_DETAIL_DOCTOR_FAIL:
            return {
                ...state,
            }
        //FETCH INFO DOCTOR
        case actionTypes.USER_FETCH_INFO_DOCTOR_SUCCESS:
            state.infoDoctorSchedule = action.res;
            return {
                ...state,
            }
        case actionTypes.USER_FETCH_INFO_DOCTOR_FAIL:
            return {
                ...state,
            }
        //CREATE BOOK APPOINTMENT SCHEDULE
        case actionTypes.USER_CREATE_APPOINTMENT_SCHEDULE_SUCCESS:
            return {
                ...state,
            }
        case actionTypes.USER_CREATE_APPOINTMENT_SCHEDULE_FAIL:
            return {
                ...state,
            }
        default:
            return state;
    }
}

export default appReducer;