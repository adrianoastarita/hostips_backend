// server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const http = require('http'); // 👈 AGGIUNTO
const { Server } = require('socket.io'); // 👈 AGGIUNTO

const guest_loginRoutes = require('./routes/guest/login_routes');
const guest_aptRoutes = require('./routes/guest/apt_routes');
const guest_partnerRoutes = require('./routes/guest/partner_routes');
const host_loginRoutes = require('./routes/host/login_routes');
const host_addbookingRoutes = require('./routes/host/addbooking_routes');
const path = require('path');

dotenv.config();

const app = express();
const server = http.createServer(app); // 👈 CREA SERVER HTTP
const io = new Server(server, {
  cors: {
    origin: '*', // 👈 imposta il dominio della tua app mobile qui se vuoi essere più sicuro
    methods: ['GET', 'POST', 'DELETE'],
  },
});

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/public', express.static(path.join(__dirname, 'public')));

// Connessione al DB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connesso a MongoDB');
  } catch (error) {
    console.error('Errore di connessione a MongoDB:', error.message);
    process.exit(1);
  }
};
connectDB();

// Salviamo l'istanza di `io` in `app` per accedervi nelle route
app.set('io', io);

// Route
app.use('/api', guest_loginRoutes);
app.use('/api', guest_aptRoutes);
app.use('/api', guest_partnerRoutes);
app.use('/api', host_loginRoutes);
app.use('/api', host_addbookingRoutes);

// 👇 Socket.IO eventi
io.on('connection', (socket) => {
  console.log('🔌 Client connesso:', socket.id);

  socket.on('disconnect', () => {
    console.log('❌ Client disconnesso:', socket.id);
  });
});

// Server attivo
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`✅ Server in ascolto sulla porta ${PORT}`);
});

