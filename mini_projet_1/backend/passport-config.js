const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const User = require('./models/user');

function initialize(passport) {
    passport.use(new LocalStrategy(
        { usernameField: 'emailId', passwordField: 'password' },
        async (emailId, password, done) => {
            try {
                const user = await User.findOne({ where: { emailId } });
                if (!user) return done(null, false, { message: 'Email non enregistré' });

                const match = await bcrypt.compare(password, user.password);
                if (!match) return done(null, false, { message: 'Mot de passe incorrect' });

                return done(null, user);
            } catch (err) {
                return done(err);
            }
        }
    ));

    passport.serializeUser((user, done) => done(null, user.id));

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findByPk(id);
            done(null, user);
        } catch (err) {
            done(err);
        }
    });
}

module.exports = initialize;
