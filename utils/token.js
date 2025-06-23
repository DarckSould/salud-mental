const jwt = require('jsonwebtoken');

const generarToken = (usuarioId) => {
  return jwt.sign({ id: usuarioId }, process.env.JWT_SECRET, {
    expiresIn: '1d', // o el tiempo que prefieras
  });
};

const verificarToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = {
  generarToken,
  verificarToken,
};
