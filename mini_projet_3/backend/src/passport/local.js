// src/passport/local.js
const passport      = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User          = require('../models/User');

passport.use(new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password'
    },
    async (email, password, done) => {
        try {
            const user = await User.findOne({ email });
            if (!user) {
                return done(null, false, { message: 'Utilisateur introuvable' });
            }
            const match = await user.comparePassword(password);
            if (!match) {
                return done(null, false, { message: 'Mot de passe incorrect' });
            }
            return done(null, user);
        } catch (err) {
            return done(err);
        }
    }
));

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
    try {
        const u = await User.findById(id);
        done(null, u);
    } catch (err) {
        done(err);
    }
});
