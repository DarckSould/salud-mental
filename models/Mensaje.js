const mongoose = require('mongoose');

const mensajeSchema = new mongoose.Schema(
  {
    contenido: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 1000,
    },
    tema: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tema',
      required: true,
    },
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    estado: {
      type: String,
      enum: ['activo', 'eliminado'],
      default: 'activo',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Mensaje', mensajeSchema);
