const authService = require('../services/authService');

const register = async (req, res) => {
  try {
    const datos = req.body;
    const resultado = await authService.register(datos);
    res.status(201).json(resultado); // <-- Incluye token y usuario
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const datos = req.body;
    const { usuario, token } = await authService.login(datos);

    res
      .cookie('token', token, {
        httpOnly: true,
        secure: true, // Forzar si estás en Netlify + Render
        sameSite: 'None', // Cambiar a 'None' cuando frontend y backend están en diferentes dominios
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .json({ usuario });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

const logout = (req, res) => {
  res.clearCookie('token').json({ mensaje: 'Sesión cerrada' });
};

module.exports = {
  register,
  login,
  logout,
};
