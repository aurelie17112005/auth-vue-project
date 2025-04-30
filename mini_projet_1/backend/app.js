const express = require('express');
const session = require('express-session');
const passport = require('passport');
const sequelize = require('./config/db');
const cors = require('cors');
const initializePassport = require('./passport-config');
const authRoutes = require('./routes/auth');
require('dotenv').config();

const app = express();
const PORT = 3000;

const allowed = ['http://localhost:5173', 'http://localhost:8081'];
app.use(cors({
    origin: (origin, callback) => {
        // origin == undefined pour les requêtes directes (Postman...)
        if (!origin || allowed.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Origine CORS non autorisée'), false);
        }
    },
    credentials: true
}));

app.use(express.json());

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

initializePassport(passport);
app.use(passport.initialize());
app.use(passport.session());
app.get('/', (req, res) => {
    res.send('API Auth ready — utilisez /auth/register, /auth/login, /auth/profile, /auth/logout');
});
app.use('/auth', authRoutes);

sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`✅ Serveur backend sur http://localhost:${PORT}`);
    });
});
