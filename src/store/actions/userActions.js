import actionTypes from './actionTypes';
import {
    fetchTopDoctorHomepageService, fetchDetailADoctor, fetchInfoDoctorService,
    createAppointmentScheduleService
} from '../../services/userService'
import { toast } from 'react-toastify';

export const addUserSuccess = () => ({
    type: actionTypes.ADD_USER_SUCCESS
})

export const userLoginSuccess = (userInfo) => ({
    type: actionTypes.USER_LOGIN_SUCCESS,
    userInfo: userInfo
})

export const userLoginFail = () => ({
    type: actionTypes.USER_LOGIN_FAIL
})

export const processLogout = () => ({
    type: actionTypes.PROCESS_LOGOUT
})

//FETCH DATA OUTSTANDINGdOCTOR

export const fetchTopDoctorHomepageStart = (limit) => {
    return async (dispatch, getState) => {
        try {
            console.log('check action top doctor homepage', limit)

            let res = await fetchTopDoctorHomepageService(+limit);
            if (res && res.errorCode === 0) {
                dispatch(fetchTopDoctorHomepageSuccess(res.data));
            }
            else {
                dispatch(fetchTopDoctorHomepageFail());
            }
        }
        catch (e) {
            dispatch(fetchTopDoctorHomepageFail());
        }
    }
}

export const fetchTopDoctorHomepageSuccess = (res) => ({
    type: actionTypes.ADMIN_FETCH_TOP_DOCTOR_HOMEPAGE_SUCCESS,
    res
})

export const fetchTopDoctorHomepageFail = () => ({
    type: actionTypes.ADMIN_FETCH_TOP_DOCTOR_HOMEPAGE_FAIL,
})

//FETCH DETAIL DOCTOR 
export const fetchDetailDoctorStart = (id) => {
    return async (dispatch, getState) => {
        try {
            let res = await fetchDetailADoctor(id);
            if (res) {
                res.user.image = await new Buffer(res.user.image, 'base64').toString('binary');
            }
            if (res && res.errorCode === 0) {
                dispatch(fetchDetailDoctorSuccess(res.user));
            }
            else {
                dispatch(fetchDetailDoctorFail());
            }
        }
        catch (e) {
            dispatch(fetchDetailDoctorFail());
        }
    }
}
export const fetchDetailDoctorSuccess = (res) => ({
    type: actionTypes.USER_FETCH_DETAIL_DOCTOR_SUCCESS,
    res
})

export const fetchDetailDoctorFail = () => ({
    type: actionTypes.USER_FETCH_DETAIL_DOCTOR_FAIL,
})

//FETCH INFO DOCTOR
export const fetchInfoDoctorStart = (id) => {
    return async (dispatch, getState) => {
        try {
            let res = await fetchInfoDoctorService(id);
            dispatch(fetchInfoDoctorSuccess(res.user));
        }
        catch (e) {
            dispatch(fetchInfoDoctorFail());
        }
    }
}
export const fetchInfoDoctorSuccess = (res) => ({
    type: actionTypes.USER_FETCH_INFO_DOCTOR_SUCCESS,
    res
})

export const fetchInfoDoctorFail = () => ({
    type: actionTypes.USER_FETCH_INFO_DOCTOR_FAIL,
})
// CREATE BOOK APPOINTMENT SCHEDULE
export const createAppointmentScheduleStart = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createAppointmentScheduleService(data)
            dispatch(createAppointmentScheduleSuccess(res));
            if (res.errorCode === 0) {
                toast.success('Book appointment schedule success')
            }
            else {
                toast.error('Error system')
            }
        }
        catch (e) {
            dispatch(createAppointmentScheduleFail());

        }
    }
}
export const createAppointmentScheduleSuccess = (res) => ({
    type: actionTypes.USER_CREATE_APPOINTMENT_SCHEDULE_SUCCESS,
    res
})

export const createAppointmentScheduleFail = () => ({
    type: actionTypes.USER_CREATE_APPOINTMENT_SCHEDULE_FAIL,
})