// src/passport/github.js
require('dotenv').config();
const passport        = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const User            = require('../models/User');
const crypto          = require('crypto');

passport.use(new GitHubStrategy(
    {
        clientID:     process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL:  process.env.GITHUB_CALLBACK_URL
    },
    async (accessToken, refreshToken, profile, done) => {
        try {
            let user = await User.findOne({ githubId: profile.id });
            if (!user) {
                const email = profile.emails?.[0]?.value || `${profile.username}@github.com`;
                user = await User.create({
                    githubId:  profile.id,
                    firstName: profile.displayName || profile.username,
                    lastName:  '',
                    email,
                    password:  crypto.randomBytes(16).toString('hex')
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
