// src/middleware/auth.js
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

module.exports = function(req, res, next) {
    const authHeader = req.headers.authorization || '';
    const token = authHeader.replace('Bearer ', '');
    if (!token) return res.status(401).json({ message: 'Token manquant' });

    try {
        const payload = jwt.verify(token, JWT_SECRET);
        req.userId = payload.userId;
        next();
    } catch {
        res.status(401).json({ message: 'Token invalide' });
    }
};
