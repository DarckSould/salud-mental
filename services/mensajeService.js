const Mensaje = require('../models/Mensaje');

const crearMensaje = async (contenido, temaId, usuarioId) => {
  const nuevo = new Mensaje({ contenido, tema: temaId, usuario: usuarioId });
  return await nuevo.save();
};

const obtenerMensajesPorTema = async (temaId) => {
  return await Mensaje.find({ tema: temaId, estado: 'activo' })
    .populate('usuario', 'nombre email')
    .sort({ createdAt: 1 });
};

const editarMensaje = async (id, usuarioId, nuevoContenido) => {
  const mensaje = await Mensaje.findById(id);
  if (!mensaje) throw new Error('Mensaje no encontrado');
  if (mensaje.usuario.toString() !== usuarioId.toString()) {
    throw new Error('No autorizado para editar este mensaje');
  }
  mensaje.contenido = nuevoContenido;
  return await mensaje.save();
};

const eliminarMensaje = async (id, usuarioId) => {
  const mensaje = await Mensaje.findById(id);
  if (!mensaje) throw new Error('Mensaje no encontrado');
  if (mensaje.usuario.toString() !== usuarioId.toString()) {
    throw new Error('No autorizado para eliminar este mensaje');
  }
  mensaje.estado = 'eliminado';
  return await mensaje.save();
};

module.exports = {
  crearMensaje,
  obtenerMensajesPorTema,
  editarMensaje,
  eliminarMensaje,
};
