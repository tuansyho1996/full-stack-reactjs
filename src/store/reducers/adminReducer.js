import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoadingGender: false,
    gender: [],
    role: [],
    users: [],
    doctorSelects: [],
    arrTimeAllcode: [],
    priceSelect: [],
    provinceSelect: [],
    paymentMethodSelect: [],
    arrSpecialtySelect: []
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADMIN_FETCH_GENDER_START:
            state.isLoadingGender = true
            return {
                ...state,
            }
        case actionTypes.ADMIN_FETCH_GENDER_SUCCESS:
            state.isLoadingGender = false;
            state.gender = action.gender;
            return {
                ...state,
            }
        case actionTypes.ADMIN_FETCH_GENDER_FAIL:
            state.isLoadingGender = false;
            return {
                ...state,
            }
        // REDUCER ROLE

        case actionTypes.ADMIN_FETCH_ROLE_SUCCESS:
            state.role = action.role;
            return {
                ...state,
            }
        case actionTypes.ADMIN_FETCH_ROLE_FAIL:
            return {
                ...state,
            }

        //REDUCER POSITION

        case actionTypes.ADMIN_FETCH_POSITION_SUCCESS:
            state.position = action.position;
            return {
                ...state,
            }
        case actionTypes.ADMIN_FETCH_POSITION_FAIL:
            return {
                ...state,
            }
        //CREATE NEW USER
        case actionTypes.ADMIN_CREATE_USER_SUCCESS:
            return {
                ...state,
            }
        case actionTypes.ADMIN_CREATE_USER_FAIL:

            return {
                ...state,
            }
        //FETCH USERS
        case actionTypes.ADMIN_FETCH_USERS_SUCCESS:
            state.users = action.users
            return {
                ...state,
            }
        case actionTypes.ADMIN_FETCH_USERS_FAIL:
            return {
                ...state,
            }
        //DELETE USER
        case actionTypes.ADMIN_DELETE_USER_SUCCESS:
            return {
                ...state,
            }
        case actionTypes.ADMIN_DELETE_USER_FAIL:
            return {
                ...state,
            }
        //EDIT USER
        case actionTypes.ADMIN_EDIT_USER_SUCCESS:
            return {
                ...state,
            }
        case actionTypes.ADMIN_EDIT_USER_FAIL:
            return {
                ...state,
            }
        //FETCH DOCTOR SELECT
        case actionTypes.ADMIN_FETCH_DOCTOR_SELECT_SUCCESS:
            state.doctorSelects = action.res
            return {
                ...state,
            }
        case actionTypes.ADMIN_FETCH_DOCTOR_SELECT_FAIL:
            return {
                ...state,
            }
        // CREATE DOCTOR MARKDOWN
        case actionTypes.ADMIN_CREATE_DOCTOR_MARKDOWN_SUCCESS:
            return {
                ...state,
            }
        case actionTypes.ADMIN_CREATE_DOCTOR_MARKDOWN_FAIL:
            return {
                ...state,
            }
        //FETCH TIME ALLCODE
        case actionTypes.ADMIN_FETCH_TIME_ALLCODE_SUCCESS:
            state.arrTimeAllcode = action.data
            return {
                ...state,
            }
        case actionTypes.ADMIN_FETCH_TIME_ALLCODE_FAIL:
            return {
                ...state,
            }
        //FETCH KEY INFO DOCTOR ALLCODE
        case actionTypes.ADMIN_FETCH_INFO_DOCTOR_ALLCODE_SUCCESS:

            if (action.res.key === 'price') {
                return {
                    ...state,
                    priceSelect: action.res.data
                }
            }
            if (action.res.key === 'province') {
                // console.log(`check run start KEY INFO DOCTOR ${action.res.key}  time`, action.res.data)

                return {
                    ...state,
                    provinceSelect: action.res.data
                }
            }
            if (action.res.key === 'payment') {
                // console.log(`check run start KEY INFO DOCTOR ${action.res.key}  time`, action.res.data)
                return {
                    ...state,
                    paymentMethodSelect: action.res.data
                }
            }

        case actionTypes.ADMIN_FETCH_INFO_DOCTOR_ALLCODE_FAIL:
            return {
                ...state,
            }
        //CREATE SPECIALTY
        case actionTypes.ADMIN_CREATE_SPECIALTY__SUCCESS:
            return {
                ...state,
            }
        case actionTypes.ADMIN_CREATE_SPECIALTY__FAIL:
            return {
                ...state,
            }
        //FETCH SPECIALTY SELECT PAGE MANAGE DOCTOR
        case actionTypes.ADMIN_FETCH_SPECIALTY_SELECT_SUCCESS:
            state.arrSpecialtySelect = action.data
            return {
                ...state,
            }
        case actionTypes.ADMIN_FETCH_SPECIALTY_SELECT_FAIL:
            return {
                ...state,
            }
        default:
            return state;
    }
}

export default appReducer;