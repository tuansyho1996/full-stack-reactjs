import actionTypes from './actionTypes';
import { fetchTopDoctorHomepageService, fetchDetailADoctor } from '../../services/userService'

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