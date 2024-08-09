const mongoose = require('mongoose');

const cursoSchema = new mongoose.Schema({
    nombreCurso : {
        type: String,
        require: true
    },
    codigo: { 
        type: String, required: true 
    },
    promedio: { 
        type: Number, required: true, min: 0, max: 20 
    },
    notas :{
        type : mongoose.Schema.Types.ObjectId, 
        red:'Nota'
    }
})

const Curso = mongoose.model('Curso', cursoSchema);

module.exports = Curso;

