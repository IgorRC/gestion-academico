const Nota = require('../models/nota.model');
const curso = require('../models/curso.model');
const Curso = require('../models/curso.model');

const ingresarNota = async (req, res) => {
  try {
    const { practica, medioCurso, final } = req.body;

    if (practica < 0 || practica > 20 || medioCurso < 0 || medioCurso > 20 || final < 0 || final > 20) {
      return res.status(400).json({ message: 'Notas deben estar en el rango de 0 a 20' });
    }

    const nuevaNota = new Nota({ practica, medioCurso, final });
    await nuevaNota.save();

    res.status(201).json(nuevaNota);
  } catch (error) {
    console.error('Error al ingresar nota:', error);
    res.status(500).json({ message: 'Error al ingresar nota', error });
  }
};

const obtenerNota = async (req, res) => {
  try {
    const id = req.params.cursoId;
    const nota = await Nota.findById(id);
    res.status(200).json(nota);
  } catch (error) {
    console.error('Error al obtener notas:', error);
    res.status(500).json({ message: 'Error al obtener notas', error });
  }
};

const actualizarNota = async (req, res) => {
  try {
    const { id } = req.params;
    const { practica, medioCurso, final, cursoActualId } = req.body;

    if (practica < 0 || practica > 20 || medioCurso < 0 || medioCurso > 20 || final < 0 || final > 20) {
      return res.status(400).json({ message: 'Notas deben estar en el rango de 0 a 20' });
    }

    const notaActualizada = await Nota.findByIdAndUpdate(id, { practica, medioCurso, final }, { new: true });
    const curso = await Curso.findById(cursoActualId);

    const promedioActual = (parseFloat(practica) * 0.15) + (parseFloat(medioCurso) * 0.35) + (parseFloat(final) * 0.50);

    await Curso.findByIdAndUpdate(cursoActualId,{
      nombreCurso : curso.nombreCurso,
      codigo : curso.codigo,
      promedio : promedioActual
    })
    res.status(200).json(notaActualizada);
  } catch (error) {
    console.error('Error al actualizar nota:', error);
    res.status(500).json({ message: 'Error al actualizar nota', error });
  }
};  

module.exports = { ingresarNota, obtenerNota, actualizarNota };
