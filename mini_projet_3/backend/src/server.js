// src/server.js
require('dotenv').config();

// Hooks globaux pour ne jamais laisser une exception planter le serveur
process.on('uncaughtException', err => {
    console.error('❌ Uncaught Exception:', err);
});
process.on('unhandledRejection', err => {
    console.error('❌ Unhandled Rejection:', err);
});

const express    = require('express');
const http       = require('http');
const cors       = require('cors');
const passport   = require('passport');
const socketIo   = require('socket.io');

// Connexion à MongoDB (voir src/config/db.js)
require('./config/db');

const app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

// 🚦 Passport strategies
require('./passport/local');
require('./passport/google');
require('./passport/github');
app.use(passport.initialize());

// 📚 Routes HTTP
app.use('/auth', require('./routes/auth'));
app.use('/chat', require('./routes/chat'));

// 🌐 Serveur HTTP + Socket.IO
const server = http.createServer(app);
const io     = socketIo(server, {
    cors: { origin: true, credentials: true }
});

// Middleware d’authentification Socket
io.use(require('./middleware/socketAuth'));

// Listener pour les erreurs de connexion socket
io.on('connect_error', err => {
    console.error('❌ Socket.IO connexion en erreur :', err.message);
});

const Message = require('./models/Message');

// Gestion des connexions WebSocket
io.on('connection', socket => {
    console.log(`🔌 Socket connecté : ${socket.id} (user =${socket.userId})`);

    // On enveloppe tout dans un try/catch pour ne jamais throw
    socket.on('chat:message', async payload => {
        try {
            const { text } = payload;
            // Sauvegarde du message
            const msg = await Message.create({
                from: socket.userId,
                text
            });
            // Populate sans execPopulate()
            const fullMsg = await msg.populate('from', 'firstName lastName email');
            // Broadcast
            io.emit('chat:message', {
                id:        fullMsg._id,
                from:      fullMsg.from,
                text:      fullMsg.text,
                timestamp: fullMsg.timestamp
            });
        } catch (err) {
            console.error('❌ Erreur dans chat:message :', err);
            // On peut notifier le client sans planter le serveur
            socket.emit('chat:error', { message: 'Envoi impossible' });
        }
    });
});

// Lancement du serveur
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`🚀 Server listening on http://localhost:${PORT}`);
});
