import axios from '../axios';
const handleLogin = async (email, password) => {
    let userData = await axios.post('/api/login', { email, password });
    return userData;
}
export { handleLogin }