import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoadingGender: false,
    gender: [],
    role: [],
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
        case actionTypes.ADMIN_FETCH_POSITION_FAIL:
            return {
                ...state,
            }

        default:
            return state;
    }
}

export default appReducer;