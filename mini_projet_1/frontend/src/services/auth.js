import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000/auth',
    withCredentials: true
});

export default {
    register(user)  { return api.post('/register', user); },
    login(creds)    { return api.post('/login', creds); },
    logout()        { return api.get('/logout'); },
    getProfile()    { return api.get('/profile'); }
};
