// src/routes/nota.routes.js
const express = require('express');
const { ingresarNota, obtenerNotas, actualizarNota } = require('../controllers/nota.controller');

const router = express.Router();

router.post('/', ingresarNota);
router.get('/:cursoId', obtenerNotas);
router.put('/:id', actualizarNota);

module.exports = router;
