const EvaluacionEstado = require('../models/Evaluacion');

const crearEvaluacion = async (usuarioId, respuestas) => {
  const evaluacion = new EvaluacionEstado({
    usuario: usuarioId,
    respuestas,
    status: 'pendiente',
  });
  return await evaluacion.save();
};

const obtenerEvaluacionesPorUsuario = async (usuarioId) => {
  return await EvaluacionEstado.find({ usuario: usuarioId });
};

const actualizarStatus = async (id, nuevoStatus) => {
  return await EvaluacionEstado.findByIdAndUpdate(
    id,
    { status: nuevoStatus },
    { new: true }
  );
};

module.exports = {
  crearEvaluacion,
  obtenerEvaluacionesPorUsuario,
  actualizarStatus,
};
