import actionTypes from './actionTypes';
import { getAllcodeService } from '../../services/userService';
import {
    createNewUserService, getAllUser, deleteUser, editUserService, fetchDoctorSlectService,
    createDoctorMarkdownService, fetchKeyInfoDoctorAllcodeSelectService, createInfoDoctorService,
    createSpecialtyService, fetchSpecialtySelectService
} from '../../services/userService';

import { ToastContainer, toast } from 'react-toastify';



//fetch gender

export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.ADMIN_FETCH_GENDER_START
            })
            let res = await getAllcodeService('gender');
            if (res && res.errorCode === 0) {
                dispatch(fetchGenderSuccess(res.data));
            }
            else {
                dispatch(fetchGenderFail());
            }
        }
        catch (e) {
            dispatch(fetchGenderFail());
        }
    }
}

export const fetchGenderSuccess = (gender) => ({
    type: actionTypes.ADMIN_FETCH_GENDER_SUCCESS,
    gender
})

export const fetchGenderFail = () => ({
    type: actionTypes.ADMIN_FETCH_GENDER_FAIL,
})

//fetch role

export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {

            let res = await getAllcodeService('role');
            if (res && res.errorCode === 0) {
                dispatch(fetchRoleSuccess(res.data));
            }
            else {
                dispatch(fetchRoleFail());
            }
        }
        catch (e) {
            dispatch(fetchRoleFail());
        }
    }
}

export const fetchRoleSuccess = (role) => ({
    type: actionTypes.ADMIN_FETCH_ROLE_SUCCESS,
    role
})

export const fetchRoleFail = () => ({
    type: actionTypes.ADMIN_FETCH_ROLE_FAIL,
})

//FETCH POSITION

export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try {

            let res = await getAllcodeService('position');
            if (res && res.errorCode === 0) {
                dispatch(fetchPositionSuccess(res.data));
            }
            else {
                dispatch(fetchPositionFail());
            }
        }
        catch (e) {
            dispatch(fetchPositionFail());
        }
    }
}

export const fetchPositionSuccess = (position) => ({
    type: actionTypes.ADMIN_FETCH_POSITION_SUCCESS,
    position
})

export const fetchPositionFail = () => ({
    type: actionTypes.ADMIN_FETCH_POSITION_FAIL,
})

//CREATE USER REDUX

export const createNewUserStart = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewUserService(data);
            if (res && res.errorCode === 0) {
                await dispatch(createNewUserSuccess(res));
                toast.success('Create user success')
                dispatch(fetchUsersStart());
            }
            else if (res && res.errorCode === 1) {
                dispatch(createNewUserFail());
                toast.error(res.message)
            }
            else {
                dispatch(createNewUserFail());
            }
        }
        catch (e) {
            dispatch(createNewUserFail());
        }
    }
}
export const createNewUserSuccess = () => ({
    type: actionTypes.ADMIN_CREATE_USER_SUCCESS,

})

export const createNewUserFail = () => ({
    type: actionTypes.ADMIN_CREATE_USER_FAIL,

})


// FETCH USER
export const fetchUsersStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllUser('ALL');
            if (res && res.errorCode === 0) {
                dispatch(fetchUsersSuccess(res.user.reverse()));
            }
            else {
                dispatch(fetchUsersFail());
            }
        }
        catch (e) {
            dispatch(fetchUsersFail());
        }
    }
}
export const fetchUsersSuccess = (users) => ({
    type: actionTypes.ADMIN_FETCH_USERS_SUCCESS,
    users
})

export const fetchUsersFail = () => ({
    type: actionTypes.ADMIN_FETCH_USERS_FAIL,
})

//DELETE USER
export const deleteUserStart = (user) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteUser(user);
            if (res && res.errorCode === 0) {
                dispatch(deleteUserSuccess());
                dispatch(fetchUsersStart());
                toast.success('Delete user succeed')
            }
            else {
                dispatch(deleteUserFail());
            }
        }
        catch (e) {
            dispatch(deleteUserFail());
        }
    }
}
export const deleteUserSuccess = () => ({
    type: actionTypes.ADMIN_DELETE_USER_SUCCESS,
})

export const deleteUserFail = () => ({
    type: actionTypes.ADMIN_DELETE_USER_FAIL,
})

//EDIT USER
export const editUserStart = (user) => {
    return async (dispatch, getState) => {
        try {
            let res = await editUserService(user);
            if (res && res.errorCode === 0) {
                dispatch(editUserSuccess());
                dispatch(fetchUsersStart());
                toast.success('Edit user succeed')
            }
            else {
                dispatch(editUserFail());
                toast.error(res.message)
            }
        }
        catch (e) {
            dispatch(editUserFail());
        }
    }
}
export const editUserSuccess = () => ({
    type: actionTypes.ADMIN_EDIT_USER_SUCCESS,
})

export const editUserFail = () => ({
    type: actionTypes.ADMIN_EDIT_USER_FAIL,
})

//FETCH DOCTOR SELECT

export const fetchDoctorSelectStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await fetchDoctorSlectService();
            if (res && res.errorCode === 0) {
                dispatch(fetchDoctorSelectSuccess(res.data));
            }
            else {
                dispatch(fetchDoctorSelectfail());
            }
        }
        catch (e) {
            dispatch(fetchDoctorSelectfail());
        }
    }
}

export const fetchDoctorSelectSuccess = (res) => ({
    type: actionTypes.ADMIN_FETCH_DOCTOR_SELECT_SUCCESS,
    res
})

export const fetchDoctorSelectfail = () => ({
    type: actionTypes.ADMIN_FETCH_DOCTOR_SELECT_FAIL,
})

// CREATE DOCTOR MARKDOWN 

export const createDoctorMarkdownStart = (inputData) => {
    return async (dispatch, getState) => {
        try {
            let res = await createDoctorMarkdownService(inputData);
            if (res && res.errorCode === 0) {
                dispatch(createDoctorMarkdownSuccess());
                toast.success(res.message)

            }
            else {
                dispatch(createDoctorMarkdownFail());
                toast.error('Create user fail')

            }
        }
        catch (e) {
            dispatch(createDoctorMarkdownFail());
        }
    }
}
export const createDoctorMarkdownSuccess = () => ({
    type: actionTypes.ADMIN_CREATE_DOCTOR_MARKDOWN_SUCCESS,
})

export const createDoctorMarkdownFail = () => ({
    type: actionTypes.ADMIN_CREATE_DOCTOR_MARKDOWN_FAIL,
})

// FETCH TIME ALLCODE

export const fetchTimeAllcodeStart = (type) => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllcodeService(type);
            console.log('check run start fetch time', res)
            if (res && res.errorCode === 0) {
                dispatch(fetchTimeAllcodeSuccess(res.data));
            }
            else {
                dispatch(fetchTimeAllcodeFail());
            }
        }
        catch (e) {
            dispatch(fetchTimeAllcodeFail());
        }
    }
}
export const fetchTimeAllcodeSuccess = (data) => ({
    type: actionTypes.ADMIN_FETCH_TIME_ALLCODE_SUCCESS,
    data
})

export const fetchTimeAllcodeFail = () => ({
    type: actionTypes.ADMIN_FETCH_TIME_ALLCODE_FAIL,
})

// FETCH KEY INFO DOCTOR ALLCODE

export const fetchKeyInfoDoctorAllcodeSelectStart = (key) => {
    return async (dispatch, getState) => {
        try {
            let res = await fetchKeyInfoDoctorAllcodeSelectService(key);
            if (res && res.errorCode === 0) {
                dispatch(fetchKeyInfoDoctorAllcodeSelectSucces({
                    key,
                    data: res.data
                }));
            }
            else {
                dispatch(fetchKeyInfoDoctorAllcodeSelectFail());
            }
        }
        catch (e) {
            dispatch(fetchKeyInfoDoctorAllcodeSelectFail());
        }
    }
}
export const fetchKeyInfoDoctorAllcodeSelectSucces = (res) => ({
    type: actionTypes.ADMIN_FETCH_INFO_DOCTOR_ALLCODE_SUCCESS,
    res
})

export const fetchKeyInfoDoctorAllcodeSelectFail = () => ({
    type: actionTypes.ADMIN_FETCH_INFO_DOCTOR_ALLCODE_FAIL,
})

// CREATE INFO DOCTOR
export const createInfoDoctorStart = (inputData) => {
    return async (dispatch, getState) => {
        try {
            let res = await createInfoDoctorService(inputData);
            if (res && res.errorCode === 0) {
                dispatch(createInfoDoctorSuccess(res.data));
            }
            else {
                dispatch(createInfoDoctorFail());
            }
        }
        catch (e) {
            dispatch(createInfoDoctorFail());
        }
    }
}
export const createInfoDoctorSuccess = (res) => ({
    type: actionTypes.ADMIN_CREATE_INFO_DOCTOR__SUCCESS,
    res
})

export const createInfoDoctorFail = () => ({
    type: actionTypes.ADMIN_CREATE_INFO_DOCTOR__FAIL,
})
// CREATE SPECIALTY 

export const createSpecialtyStart = (inputData) => {
    return async (dispatch, getState) => {
        try {
            let res = await createSpecialtyService(inputData);
            if (res && res.errorCode === 0) {
                dispatch(createSpecialtySuccess());
                toast.success('Create specialty success')
            }
            else {
                dispatch(createSpecialtyFail());
            }
        }
        catch (e) {
            dispatch(createSpecialtyFail());
        }
    }
}
export const createSpecialtySuccess = () => ({
    type: actionTypes.ADMIN_CREATE_SPECIALTY__SUCCESS,
})

export const createSpecialtyFail = () => ({
    type: actionTypes.ADMIN_CREATE_SPECIALTY__FAIL,
})

//FETCH SPECIALTY SELECT PAGE MANAGE DOCTOR
export const fetchSpecialtySelectStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await fetchSpecialtySelectService();
            if (res && res.errorCode === 0) {
                dispatch(fetchSpecialtySelectSuccess(res.data));
            }
            else {
                dispatch(fetchSpecialtySelectFail());
            }
        }
        catch (e) {
            dispatch(fetchSpecialtySelectFail());
        }
    }
}
export const fetchSpecialtySelectSuccess = (data) => ({
    type: actionTypes.ADMIN_FETCH_SPECIALTY_SELECT_SUCCESS,
    data: data
})

export const fetchSpecialtySelectFail = () => ({
    type: actionTypes.ADMIN_FETCH_SPECIALTY_SELECT_FAIL,
})




