const mongoose = require('mongoose');

const temaSchema = new mongoose.Schema(
  {
    titulo: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 100,
    },
    descripcion: {
      type: String,
      trim: true,
      maxlength: 500,
    },
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    estado: {
      type: String,
      enum: ['activo', 'cerrado', 'eliminado'],
      default: 'activo',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Tema', temaSchema);
