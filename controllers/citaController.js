const citaService = require('../services/citaService');

const agendarCita = async (req, res) => {
  try {
    const { fecha, motivo } = req.body;

    if (!fecha || !motivo) {
      return res.status(400).json({ error: 'Fecha y motivo son requeridos' });
    }

    const cita = await citaService.crearCita(req.user._id, fecha, motivo);
    res.status(201).json(cita);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const obtenerMisCitas = async (req, res) => {
  try {
    const citas = await citaService.obtenerCitasPorUsuario(req.user._id);
    res.json(citas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  agendarCita,
  obtenerMisCitas,
};
