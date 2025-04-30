import axios from 'axios'
const api = axios.create({ baseURL: 'http://localhost:3000', withCredentials: true })

api.interceptors.request.use(cfg => {
    const t = localStorage.getItem('jwt')
    if (t) cfg.headers.Authorization = `Bearer ${t}`
    return cfg
})

export default {
    register: data => api.post('/auth/register', data),
    login: creds     => api.post('/auth/login', creds),
    oauthLogin: (provider, code) =>
        api.get(`/auth/${provider}/callback?code=${code}`),
    profile: ()      => api.get('/auth/profile'),
    logout: ()       => { localStorage.removeItem('jwt') }
}
