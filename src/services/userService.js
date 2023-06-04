import axios from '../axios';
const handleLogin = async (email, password) => {
    let userData = await axios.post('/api/login', { email, password });
    return userData;
}
const getAllUser = async (id) => {
    let users = await axios.get(`/api/get-user?id=${id}`);
    return users
}
export { handleLogin, getAllUser }