// src/models/User.js
const mongoose = require('mongoose');
const bcrypt   = require('bcrypt');

const UserSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName:  { type: String, default: '' },
    email:     { type: String, required: true, unique: true },
    password:  { type: String, required: true },
    googleId:  { type: String, default: null },
    githubId:  { type: String, default: null }
});

// Index unique sur email
UserSchema.index({ email: 1 }, { unique: true });

// Hash avant sauvegarde
UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Méthode pour comparer le mot de passe
UserSchema.methods.comparePassword = function(candidate) {
    return bcrypt.compare(candidate, this.password);
};

module.exports = mongoose.model('User', UserSchema);
