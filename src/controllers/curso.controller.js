const Curso = require('../models/curso.model');
const Nota = require('../models/nota.model');


const obtenerCursos = async (req, res) => {
    try {
        const requesCursos = await Curso.find();
        res.status(200).json(requesCursos);
    } catch (error) {
        console.error('error en obtener cursos', error);
        es.status(500).json({ 
            message: 'error en obtener cursos', error 
        });
    }
}

const crearCurso = async (req, res) =>{
    try {
        const {nombreCurso, codigo} = req.body;

        const nuevaNota = new Nota({
            practica : 0,
            medioCurso: 0,
            final: 0
        });
        
        const guardarNota = await nuevaNota.save();

        const nuevoCurso = new Curso({
            nombreCurso,
            codigo,
            promedio : 0,
            notas : guardarNota._id
        });
        const cursoGuardado = await nuevoCurso.save();
        res.status(201).json({
            message : 'Curso crado exitosamente',
            curso :  cursoGuardado
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error al crear el curso',
            error: error.message
        });
    }
}

module.exports = {obtenerCursos,crearCurso};