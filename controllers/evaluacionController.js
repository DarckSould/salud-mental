const evaluacionService = require('../services/evaluacionService');

const crearEvaluacion = async (req, res) => {
  try {
    const respuestas = req.body.respuestas;

    if (!respuestas || !Array.isArray(respuestas) || respuestas.length < 5) {
      return res
        .status(400)
        .json({ error: 'Se requieren al menos 5 respuestas' });
    }

    const evaluacion = await evaluacionService.crearEvaluacion(
      req.user._id,
      respuestas
    );

    res.status(201).json(evaluacion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const obtenerEvaluaciones = async (req, res) => {
  try {
    const evaluaciones = await evaluacionService.obtenerEvaluacionesPorUsuario(
      req.user._id
    );
    res.json(evaluaciones);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const actualizarStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const actualizada = await evaluacionService.actualizarStatus(id, status);
    res.json(actualizada);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  crearEvaluacion,
  obtenerEvaluaciones,
  actualizarStatus,
};
