const mongoose = require('mongoose');

const notaSchema = new mongoose.Schema({
  practica: { type: Number, required: true, min: 0, max: 20 },
  medioCurso: { type: Number, required: true, min: 0, max: 20 },
  final: { type: Number, required: true, min: 0, max: 20 }
});

const Nota = mongoose.model('Nota', notaSchema);

module.exports = Nota;
