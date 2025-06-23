// server.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const http = require('http');
const { Server } = require('socket.io');
require('dotenv').config();
const cookieParser = require('cookie-parser');

// Rutas
const authRoutes = require('./routes/authRoutes');
const temaRoutes = require('./routes/temaRoutes');
const mensajeRoutes = require('./routes/mensajeRoutes');
const evaluacionRoutes = require('./routes/evaluacionRoutes');
const citaRoutes = require('./routes/citaRoutes');

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'https://salud-mental-frontend.netlify.app',
    credentials: true,
  },
});

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('✅ Conectado a MongoDB'))
  .catch((err) => console.error('❌ Error al conectar MongoDB:', err));

app.use(cookieParser());
app.use(
  cors({
    origin: 'https://salud-mental-frontend.netlify.app',
    credentials: true,
  })
);
app.use(express.json());
app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use('/auth', authRoutes);
app.use('/temas', temaRoutes);
app.use('/mensajes', mensajeRoutes);
app.use('/evaluaciones', evaluacionRoutes);
app.use('/citas', citaRoutes);

io.on('connection', (socket) => {
  console.log('🟢 Usuario conectado vía socket');
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
