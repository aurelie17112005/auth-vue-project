const express = require('express');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../models/user');

const router = express.Router();

// Inscription
router.post('/register', async (req, res) => {
    const { firstName, lastName, emailId, password } = req.body;
    try {
        const hash = await bcrypt.hash(password, 10);
        const user = await User.create({ firstName, lastName, emailId, password: hash });
        res.status(201).json({ message: 'Inscription réussie', user: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                emailId: user.emailId
            } });
    } catch (err) {
        res.status(500).json({ message: 'Erreur lors de l’inscription', error: err.message });
    }
});

// Connexion
router.post('/login', passport.authenticate('local'), (req, res) => {
    const { id, firstName, lastName, emailId } = req.user;
    res.json({ message: 'Connecté', user: { id, firstName, lastName, emailId } });
});

// Déconnexion
router.get('/logout', (req, res) => {
    req.logout(() => {
        res.json({ message: 'Déconnecté' });
    });
});

// Profil protégé
router.get('/profile', (req, res) => {
    if (req.isAuthenticated()) {
        const { id, firstName, lastName, emailId } = req.user;
        res.json({ user: { id, firstName, lastName, emailId } });
    } else {
        res.status(401).json({ message: 'Non authentifié' });
    }
});

module.exports = router;
