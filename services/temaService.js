const Tema = require('../models/Tema');

const crearTema = async (datos) => {
  const nuevo = new Tema(datos);
  return await nuevo.save();
};

const obtenerTemas = async () => {
  return await Tema.find({ estado: 'activo' }).populate(
    'usuario',
    'nombre email'
  );
};

const obtenerTemaPorId = async (id) => {
  return await Tema.findById(id).populate('usuario', 'nombre email');
};

const cerrarTema = async (id) => {
  return await Tema.findByIdAndUpdate(id, { estado: 'cerrado' }, { new: true });
};

const eliminarTema = async (id) => {
  return await Tema.findByIdAndUpdate(
    id,
    { estado: 'eliminado' },
    { new: true }
  );
};

const editarTema = async (id, userId, nuevoContenido) => {
  const tema = await Tema.findById(id);
  if (!tema) throw new Error('Tema no encontrado');
  if (tema.usuario.toString() !== userId.toString()) {
    throw new Error('No tienes permisos para editar este tema');
  }
  tema.titulo = nuevoContenido.titulo || tema.titulo;
  tema.descripcion = nuevoContenido.descripcion || tema.descripcion;
  return await tema.save();
};

module.exports = {
  crearTema,
  obtenerTemas,
  obtenerTemaPorId,
  cerrarTema,
  eliminarTema,
  editarTema,
};
