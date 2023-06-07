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
export { handleLogin, getAllUser, createNewUserService, deleteUser, editUserService }