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
const createDoctorMarkdownService = async (inputData) => {
    let res = await axios.post('/api/create-doctor-markdown', inputData);
    return res
}
const fetchDetailADoctor = async (id) => {
    let res = await axios.get(`/api/fetch-a-user/${id}`);
    return res
}


export {
    handleLogin, getAllUser, createNewUserService, deleteUser, editUserService,
    getAllcodeService, fetchTopDoctorHomepageService, fetchDoctorSlectService,
    createDoctorMarkdownService, fetchDetailADoctor
}