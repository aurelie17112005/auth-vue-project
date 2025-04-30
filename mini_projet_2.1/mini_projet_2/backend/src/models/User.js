// src/models/User.js
const mongoose  = require('mongoose');
const bcrypt    = require('bcrypt');

const UserSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName:  { type: String, required: true },
    email:     { type: String, required: true, unique: true },
    password:  { type: String, required: true }
});
// juste après votre UserSchema
UserSchema.index({ email: 1 }, { unique: true });

// Hash du mot de passe avant sauvegarde
UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Vérification du mot de passe
UserSchema.methods.comparePassword = function(candidate) {
    return bcrypt.compare(candidate, this.password);
};

module.exports = mongoose.model('User', UserSchema);
