import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoggedIn: false,
    userInfo: null,
    topDoctors: [],
    infoDoctor: {}
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
            console.log('check res topDoctor', action.res)
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
        default:
            return state;
    }
}

export default appReducer;