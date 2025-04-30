// src/services/chat.js
import io from 'socket.io-client'

let socket = null
export function connectSocket() {
    const token = localStorage.getItem('jwt')
    socket = io('http://localhost:3000', {
        auth: { token },
    })
    return socket
}

export function sendMessage(text) {
    socket.emit('chat:message', { text })
}

export function onMessage(fn) {
    socket.on('chat:message', fn)
}
