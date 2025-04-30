import http from './http'

export default {
    register(data) {
        return http.post('/auth/register', data)
    },
    login(creds) {
        return http.post('/auth/login', creds)
    },
    profile() {
        return http.get('/auth/profile')
    }
}
