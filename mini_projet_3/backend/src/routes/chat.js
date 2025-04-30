// src/routes/chat.js
const express = require('express');
const authMw  = require('../middleware/auth');
const Message = require('../models/Message');

const router = express.Router();

// Historique des 100 derniers messages
router.get('/history', authMw, async (req, res) => {
    try {
        const msgs = await Message.find()
            .sort({ timestamp: 1 })
            .limit(100)
            .populate('from', 'firstName lastName email');
        res.json({ messages: msgs });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
