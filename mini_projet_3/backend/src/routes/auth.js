// src/routes/auth.js
const express  = require('express');
const passport = require('passport');
const jwt      = require('jsonwebtoken');
const User     = require('../models/User');
const authMw   = require('../middleware/auth');
require('dotenv').config();

const router = express.Router();

// Inscription
router.post('/register', async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json({ userId: user._id });
    } catch (e) {
        res.status(400).json({
            message: e.code === 11000
                ? 'Email déjà utilisé'
                : e.message
        });
    }
});

// Login local
router.post(
    '/login',
    passport.authenticate('local', { session: false }),
    (req, res) => {
        const token = jwt.sign(
            { userId: req.user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
        res.json({ token });
    }
);

// Google OAuth
router.get('/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);
router.get('/google/callback',
    passport.authenticate('google', { session: false, failureRedirect: '/login' }),
    (req, res) => {
        const token = jwt.sign(
            { userId: req.user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
        res.redirect(`${process.env.FRONTEND_URL}/oauth/callback/google?token=${token}`);
    }
);

// GitHub OAuth
router.get('/github',
    passport.authenticate('github', { scope: ['user:email'] })
);
router.get('/github/callback',
    passport.authenticate('github', { session: false, failureRedirect: '/login' }),
    (req, res) => {
        const token = jwt.sign(
            { userId: req.user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
        res.redirect(`${process.env.FRONTEND_URL}/oauth/callback/github?token=${token}`);
    }
);

// Profil (JWT)
router.get('/profile', authMw, async (req, res) => {
    const user = await User.findById(req.userId).select('-password');
    res.json({ user });
});

module.exports = router;
