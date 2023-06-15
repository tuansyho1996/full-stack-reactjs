import actionTypes from './actionTypes';
import { getAllcodeService } from '../../services/userService';
import { createNewUserService } from '../../services/userService';


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
                dispatch(createNewUserSuccess(res));
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
export const createNewUserSuccess = (res) => ({
    type: actionTypes.ADMIN_CREATE_USER_SUCCESS,
    res
})

export const createNewUserFail = () => ({
    type: actionTypes.ADMIN_FETCH_POSITION_FAIL,
})

