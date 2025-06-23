const mongoose = require('mongoose');

const evaluacionSchema = new mongoose.Schema(
  {
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    respuestas: [
      {
        pregunta: { type: String, required: true },
        respuesta: { type: String, required: true },
      },
    ],
    status: {
      type: String,
      enum: ['completada', 'pendiente', 'rechazada'],
      default: 'completada',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('EvaluacionEstado', evaluacionSchema);
