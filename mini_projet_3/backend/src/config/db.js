// src/config/db.js
const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.MONGO_URI;
if (!uri) {
    console.error('❌ MONGO_URI non défini dans .env');
    process.exit(1);
}

mongoose
    .connect(uri, {
        useNewUrlParser:    true,
        useUnifiedTopology: true
    })
    .then(() => console.log('✅ MongoDB connecté'))
    .catch(err => {
        console.error('❌ Erreur de connexion MongoDB :', err);
        process.exit(1);
    });

module.exports = mongoose;
