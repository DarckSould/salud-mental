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
// CORS para socket.io
const io = new Server(server, {
  cors: {
    origin: ['http://localhost:5500', 'http://localhost:3000'],
    credentials: true,
  },
});

app.use(cookieParser());

// Conexión MongoDB
mongoose
  .connect('mongodb://localhost:27017/foro_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('✅ Conectado a MongoDB'))
  .catch((err) => console.error('❌ Error al conectar MongoDB:', err));

// Middleware globales
// CORS para Express
app.use(
  cors({
    origin: ['http://localhost:5500', 'http://localhost:3000'],
    credentials: true,
  })
);

app.use(express.json());

// Middleware para inyectar io
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Rutas
app.use('/auth', authRoutes);
app.use('/temas', temaRoutes);
app.use('/mensajes', mensajeRoutes);
app.use('/evaluaciones', evaluacionRoutes);
app.use('/citas', citaRoutes);

// Socket activo
io.on('connection', (socket) => {
  console.log('🟢 Usuario conectado vía socket');
});

// Puerto
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
