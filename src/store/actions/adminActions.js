import actionTypes from './actionTypes';
import { getAllcodeService } from '../../services/userService'

export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
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

