// src/server.js
require('dotenv').config();
const express = require('express');
const cors    = require('cors');
const db      = require('./config/db');
const authRt  = require('./routes/auth');
const setupSwagger = require('./swagger');

const app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

setupSwagger(app);
app.use('/auth', authRt);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`⚡️ Server listening on port ${PORT}`));
