const Cita = require('../models/Cita');

const crearCita = async (usuarioId, fecha, motivo) => {
  const cita = new Cita({ usuario: usuarioId, fecha, motivo });
  return await cita.save();
};

const obtenerCitasPorUsuario = async (usuarioId) => {
  return await Cita.find({ usuario: usuarioId }).sort({ fecha: 1 });
};

module.exports = {
  crearCita,
  obtenerCitasPorUsuario,
};
