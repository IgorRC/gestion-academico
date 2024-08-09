const express = require('express');
const {obtenerCursos, crearCurso} = require('../controllers/curso.controller');

const router = express.Router();

router.get('/todo',obtenerCursos);
router.post('/agregar',crearCurso);

module.exports = router;