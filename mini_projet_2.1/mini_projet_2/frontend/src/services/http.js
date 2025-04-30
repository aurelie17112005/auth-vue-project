import axios from 'axios'

const http = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true
})

// Injecte automatiquement le JWT si présent
http.interceptors.request.use(config => {
    const token = localStorage.getItem('jwt')
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
})

export default http
