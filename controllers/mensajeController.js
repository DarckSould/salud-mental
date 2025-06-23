const mensajeService = require('../services/mensajeService');

const crearMensaje = async (req, res) => {
  try {
    const { contenido, temaId } = req.body;
    const nuevo = await mensajeService.crearMensaje(
      contenido,
      temaId,
      req.user._id
    );

    if (req.io) req.io.emit('nuevo-mensaje', temaId); // ✅ solo enviamos el temaId

    res.status(201).json(nuevo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const obtenerMensajesPorTema = async (req, res) => {
  try {
    const mensajes = await mensajeService.obtenerMensajesPorTema(
      req.params.temaId
    );
    res.json(mensajes);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const editarMensaje = async (req, res) => {
  try {
    const actualizado = await mensajeService.editarMensaje(
      req.params.id,
      req.user._id,
      req.body.contenido
    );

    if (req.io) req.io.emit('mensaje-editado', actualizado.tema); // ✅ solo temaId

    res.json(actualizado);
  } catch (error) {
    res.status(403).json({ error: error.message });
  }
};

const eliminarMensaje = async (req, res) => {
  try {
    const eliminado = await mensajeService.eliminarMensaje(
      req.params.id,
      req.user._id
    );

    if (req.io) req.io.emit('mensaje-eliminado', eliminado.tema); // ✅ solo temaId

    res.json(eliminado);
  } catch (error) {
    res.status(403).json({ error: error.message });
  }
};

module.exports = {
  crearMensaje,
  obtenerMensajesPorTema,
  editarMensaje,
  eliminarMensaje,
};
