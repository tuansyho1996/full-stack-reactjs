const actionTypes = Object.freeze({
    //app
    APP_START_UP_COMPLETE: 'APP_START_UP_COMPLETE',
    SET_CONTENT_OF_CONFIRM_MODAL: 'SET_CONTENT_OF_CONFIRM_MODAL',
    CHANGE_LANGUAGE: 'CHANGE_LANGUAGE',



    //user
    ADD_USER_SUCCESS: 'ADD_USER_SUCCESS',

    USER_LOGIN_SUCCESS: 'USER_LOGIN_SUCCESS',
    USER_LOGIN_FAIL: 'USER_LOGIN_FAIL',
    PROCESS_LOGOUT: 'PROCESS_LOGOUT',
    USER_FETCH_DETAIL_DOCTOR_SUCCESS: 'USER_FETCH_DETAIL_DOCTOR_SUCCESS',
    USER_FETCH_DETAIL_DOCTOR_FAIL: 'USER_FETCH_DETAIL_DOCTOR_FAIL',

    //ADMIN
    ADMIN_FETCH_GENDER_START: 'ADMIN_FETCH_GENDER_START',
    ADMIN_FETCH_GENDER_SUCCESS: 'ADMIN_FETCH_GENDER_SUCCESS',
    ADMIN_FETCH_GENDER_FAIL: 'ADMIN_FETCH_GENDER_FAIL',
    ADMIN_FETCH_ROLE_SUCCESS: 'ADMIN_FETCH_ROLE_SUCCESS',
    ADMIN_FETCH_ROLE_FAIL: 'ADMIN_FETCH_ROLE_FAIL',
    ADMIN_FETCH_POSITION_SUCCESS: 'ADMIN_FETCH_POSITION_SUCCESS',
    ADMIN_FETCH_POSITION_FAIL: 'ADMIN_FETCH_POSITION_FAIL',

    ADMIN_CREATE_USER_SUCCESS: 'ADMIN_CREATE_USER_SUCCESS',
    ADMIN_CREATE_USER_FAIL: 'ADMIN_CREATE_USER_FAIL',

    ADMIN_FETCH_USERS_SUCCESS: 'ADMIN_FETCH_USERS_SUCCESS',
    ADMIN_FETCH_USERS_FAIL: 'ADMIN_FETCH_USERS_FAIL',

    ADMIN_DELETE_USER_SUCCESS: 'ADMIN_DELETE_USER_SUCCESS',
    ADMIN_DELETE_USER_FAIL: 'ADMIN_DELETE_USER_FAIL',

    ADMIN_EDIT_USER_SUCCESS: 'ADMIN_EDIT_USER_SUCCESS',
    ADMIN_EDIT_USER_FAIL: 'ADMIN_EDIT_USER_FAIL',

    ADMIN_FETCH_TOP_DOCTOR_HOMEPAGE_SUCCESS: 'ADMIN_FETCH_TOP_DOCTOR_HOMEPAGE_SUCCESS',
    ADMIN_FETCH_TOP_DOCTOR_HOMEPAGE_FAIL: 'ADMIN_FETCH_TOP_DOCTOR_HOMEPAGE_FAIL',

    ADMIN_FETCH_DOCTOR_SELECT_SUCCESS: 'ADMIN_FETCH_DOCTOR_SELECT_SUCCESS',
    ADMIN_FETCH_DOCTOR_SELECT_FAIL: 'ADMIN_FETCH_DOCTOR_SELECT_FAIL',

    ADMIN_CREATE_DOCTOR_MARKDOWN_SUCCESS: 'ADMIN_CREATE_DOCTOR_MARKDOWN_SUCCESS',
    ADMIN_CREATE_DOCTOR_MARKDOWN_FAIL: 'ADMIN_CREATE_DOCTOR_MARKDOWN_FAIL',

    ADMIN_FETCH_TIME_ALLCODE_SUCCESS: 'ADMIN_FETCH_TIME_ALLCODE_SUCCESS',
    ADMIN_FETCH_TIME_ALLCODE_FAIL: 'ADMIN_FETCH_TIME_ALLCODE_FAIL',

    ADMIN_FETCH_INFO_DOCTOR_ALLCODE_SUCCESS: 'ADMIN_FETCH_INFO_DOCTOR_ALLCODE_SUCCESS',
    ADMIN_FETCH_INFO_DOCTOR_ALLCODE_FAIL: 'ADMIN_FETCH_INFO_DOCTOR_ALLCODE_FAIL',

    ADMIN_CREATE_INFO_DOCTOR__SUCCESS: 'ADMIN_CREATE_INFO_DOCTOR__SUCCESS',
    ADMIN_CREATE_INFO_DOCTOR__FAIL: 'ADMIN_CREATE_INFO_DOCTOR__FAIL'


})

export default actionTypes;