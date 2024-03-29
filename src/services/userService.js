import axios from '../axios';
const handleLogin = async (email, password) => {
    let userData = await axios.post('/api/login', { email, password });
    return userData;
}
const getAllUser = async (id) => {
    let users = await axios.get(`/api/get-user?id=${id}`);
    return users
}
const createNewUserService = async (data) => {
    let user = await axios.post('/api/create-new-user', data);
    return user
}
const deleteUser = async (user) => {
    let res = await axios.delete('/api/delete-user', { data: { id: user.id } });
    return res
}
const editUserService = async (data) => {
    let res = await axios.put('/api/edit-user', data);
    return res
}

const getAllcodeService = async (type) => {
    let res = await axios.get(`/api/get-allcode?type=${type}`);
    return res
}
const fetchTopDoctorHomepageService = async (limit) => {
    let res = await axios.get(`/api/get-top-doctor-homepage?limit=${limit}`);
    return res
}
const fetchDoctorSlectService = async () => {
    let res = await axios.get('/api/get-doctor-select');
    return res
}
const fetchKeyInfoDoctorAllcodeSelectService = async (type) => {
    let res = await axios.get(`/api/fetch-key-info-doctor-allcode-select?type=${type}`);
    return res
}
const createDoctorMarkdownService = async (inputData) => {
    let res = await axios.post('/api/create-doctor-markdown', inputData);
    return res
}
const createInfoDoctorService = async (inputData) => {
    let res = await axios.post('/api/create-info-doctor', inputData);
    return res
}
const fetchDetailADoctor = async (id) => {
    let res = await axios.get(`/api/fetch-a-user/${id}`);
    return res
}
const bulkCreateSchedule = async (data) => {
    let res = await axios.post('/api/bulk-create-schedule', data)
    return res
}
const fetchTimeSchedule = async (doctorId, date) => {
    let res = await axios.get(`/api/fetch-schedule-doctor?doctorId=${doctorId}&date=${date}`);
    return res
}
const fetchInfoDoctorService = async (doctorId) => {
    let res = await axios.get(`/api/fetch-info-doctor?id=${doctorId}`);
    return res
}
const createAppointmentScheduleService = async (data) => {
    let res = await axios.post('/api/book-appointment-schedule', data);
    return res
}

const fetchVerifyBookingEmailService = async (token, doctorId) => {
    let res = await axios.get(`/api/verify-email-book-appointment-schedule?token=${token}&doctorId=${doctorId}`);
    return res
}
const createSpecialtyService = async (data) => {
    let res = await axios.post('/api/create-specialty', data);
    return res
}
const fetchSpecialtyService = async (id) => {
    let res = await axios.get(`/api/fetch-specialty?id=${id}`);
    return res
}
const fetchSpecialtySelectService = async () => {
    let res = await axios.get(`/api/fetch-specialty-select`);
    return res
}
const fetchListDoctorSpecialtyService = async (specialtyId) => {
    let res = await axios.get(`/api/fetch-list-doctor-specialty?specialtyId=${specialtyId}`);
    return res
}
export {
    handleLogin, getAllUser, createNewUserService, deleteUser, editUserService,
    getAllcodeService, fetchTopDoctorHomepageService, fetchDoctorSlectService,
    createDoctorMarkdownService, fetchDetailADoctor, bulkCreateSchedule, fetchTimeSchedule,
    fetchKeyInfoDoctorAllcodeSelectService, createInfoDoctorService, fetchInfoDoctorService,
    createAppointmentScheduleService, fetchVerifyBookingEmailService, createSpecialtyService,
    fetchSpecialtyService, fetchSpecialtySelectService, fetchListDoctorSpecialtyService
}