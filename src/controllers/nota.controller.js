const Nota = require('../models/nota.model');

const ingresarNota = async (req, res) => {
  try {
    const { practica, medioCurso, final } = req.body;

    if (practica < 0 || practica > 20 || medioCurso < 0 || medioCurso > 20 || final < 0 || final > 20) {
      return res.status(400).json({ message: 'Notas deben estar en el rango de 0 a 20' });
    }

    const nuevaNota = new Nota({ practica, medioCurso, final });
    console.log(nuevaNota)
    await nuevaNota.save();

    res.status(201).json(nuevaNota);
  } catch (error) {
    console.error('Error al ingresar nota:', error);
    res.status(500).json({ message: 'Error al ingresar nota', error });
  }
};

const obtenerNotas = async (req, res) => {
  try {
    const notas = await Nota.find();

    res.status(200).json(notas);
  } catch (error) {
    console.error('Error al obtener notas:', error);
    res.status(500).json({ message: 'Error al obtener notas', error });
  }
};

const actualizarNota = async (req, res) => {
  try {
    const { id } = req.params;
    const { practica, medioCurso, final } = req.body;

    if (practica < 0 || practica > 20 || medioCurso < 0 || medioCurso > 20 || final < 0 || final > 20) {
      return res.status(400).json({ message: 'Notas deben estar en el rango de 0 a 20' });
    }

    const notaActualizada = await Nota.findByIdAndUpdate(id, { practica, medioCurso, final }, { new: true });

    res.status(200).json(notaActualizada);
  } catch (error) {
    console.error('Error al actualizar nota:', error);
    res.status(500).json({ message: 'Error al actualizar nota', error });
  }
};

module.exports = { ingresarNota, obtenerNotas, actualizarNota };
