// src/passport/google.js
require('dotenv').config();
const passport       = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User           = require('../models/User');
const crypto         = require('crypto');

passport.use(new GoogleStrategy(
    {
        clientID:     process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL:  process.env.GOOGLE_CALLBACK_URL
    },
    async (accessToken, refreshToken, profile, done) => {
        try {
            let user = await User.findOne({ googleId: profile.id });
            if (!user) {
                user = await User.create({
                    googleId:   profile.id,
                    firstName:  profile.name.givenName,
                    lastName:   profile.name.familyName,
                    email:      profile.emails[0].value,
                    password:   crypto.randomBytes(16).toString('hex')
                });
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
