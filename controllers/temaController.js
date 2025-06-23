const temaService = require('../services/temaService');

const crearTema = async (req, res) => {
  try {
    const datos = {
      ...req.body,
      usuario: req.user._id,
    };
    const nuevo = await temaService.crearTema(datos);

    if (req.io) req.io.emit('nuevo-tema', nuevo);

    res.status(201).json(nuevo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const obtenerTemas = async (_req, res) => {
  try {
    const temas = await temaService.obtenerTemas();
    res.json(temas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const obtenerTemaPorId = async (req, res) => {
  try {
    const tema = await temaService.obtenerTemaPorId(req.params.id);
    if (!tema || tema.estado === 'eliminado')
      return res.status(404).json({ error: 'Tema no encontrado' });
    res.json(tema);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const editarTema = async (req, res) => {
  try {
    const actualizado = await temaService.editarTema(
      req.params.id,
      req.user._id,
      req.body.titulo,
      req.body.descripcion
    );

    if (req.io) req.io.emit('tema-editado', actualizado);

    res.json(actualizado);
  } catch (error) {
    res.status(403).json({ error: error.message });
  }
};

const cerrarTema = async (req, res) => {
  try {
    const cerrado = await temaService.cerrarTema(req.params.id);

    if (req.io) req.io.emit('tema-cerrado', cerrado);

    res.json(cerrado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const eliminarTema = async (req, res) => {
  try {
    const eliminado = await temaService.eliminarTema(req.params.id);

    if (req.io) req.io.emit('tema-eliminado', eliminado);

    res.json(eliminado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  crearTema,
  obtenerTemas,
  obtenerTemaPorId,
  editarTema,
  cerrarTema,
  eliminarTema,
};
