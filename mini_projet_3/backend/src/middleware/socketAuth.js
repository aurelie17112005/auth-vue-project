// src/middleware/socketAuth.js
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (socket, next) => {
    const token =
        socket.handshake.auth?.token ||
        socket.handshake.query?.token;
    if (!token) {
        return next(new Error('Authentication token required'));
    }
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        socket.userId = payload.userId;
        next();
    } catch {
        next(new Error('Invalid authentication token'));
    }
};
