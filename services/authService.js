const bcrypt = require('bcrypt');
const User = require('../models/User');
const { generarToken } = require('../utils/token');

// Registro (ya no hacemos doble hash aquí)
const register = async ({ nombre, email, password }) => {
  const existe = await User.findOne({ email });
  if (existe) throw new Error('El email ya está registrado');

  const nuevo = new User({ nombre, email, password }); // El hash se hace en el modelo
  await nuevo.save();

  const token = generarToken(nuevo._id);
  return { usuario: nuevo, token };
};

// Login
const login = async ({ email, password }) => {
  const usuario = await User.findOne({ email, estado: 'activo' });
  if (!usuario) throw new Error('Credenciales inválidas');

  const coincide = await bcrypt.compare(password, usuario.password);
  if (!coincide) throw new Error('Credenciales inválidas');

  const token = generarToken(usuario._id);
  return { usuario, token };
};

module.exports = {
  register,
  login,
};
