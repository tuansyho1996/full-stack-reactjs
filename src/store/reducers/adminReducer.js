import actionTypes from '../actions/actionTypes';

const initialState = {
    gender: [],
    role: [],
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADMIN_FETCH_GENDER_SUCCESS:
            let copyState = { ...state };
            copyState.gender = action.gender;
            return {
                ...copyState,
            }
        case actionTypes.ADMIN_FETCH_GENDER_FAIL:
            return {
                ...state,
            }

        default:
            return state;
    }
}

export default appReducer;