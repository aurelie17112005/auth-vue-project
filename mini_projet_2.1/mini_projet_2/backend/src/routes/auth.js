/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Gestion de l’authentification
 *
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: Identifiant MongoDB
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         email:
 *           type: string
 *       example:
 *         _id: 60d0fe4f5311236168a109ca
 *         firstName: John
 *         lastName: Doe
 *         email: john.doe@example.com
 */

const router = require('express').Router();
const jwt    = require('jsonwebtoken');
const User   = require('../models/User');
const authMw = require('../middleware/auth');
require('dotenv').config();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Inscription d’un nouvel utilisateur
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *               - password
 *     responses:
 *       201:
 *         description: Utilisateur créé
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userId:
 *                   type: string
 *       400:
 *         description: Données invalides ou email déjà utilisé
 */
router.post('/register', async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    try {
        const user = await User.create({ firstName, lastName, email, password });
        res.status(201).json({ userId: user._id });
    } catch (e) {
        res.status(400).json({
            message: e.code === 11000
                ? 'Email déjà utilisé'
                : e.message
        });
    }
});

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Connexion d’un utilisateur existant
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Connexion réussie, renvoie un token JWT
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       401:
 *         description: Identifiants invalides
 */
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
        return res.status(401).json({ message: 'Identifiants invalides' });
    }
    const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );
    res.json({ token });
});

/**
 * @swagger
 * /auth/profile:
 *   get:
 *     summary: Récupère le profil de l’utilisateur connecté
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Profil utilisateur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       401:
 *         description: Token manquant ou invalide
 */
router.get('/profile', authMw, async (req, res) => {
    const user = await User.findById(req.userId).select('-password');
    res.json({ user });
});

module.exports = router;
