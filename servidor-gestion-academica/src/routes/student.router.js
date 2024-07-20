const express = require('express')

const router = express.Router();

router.post('/student',(req,res) =>{
    const {name, fullName, age, faculty, weightedAverage} = req.body
    const _id = 'xyz'

    res.status(201).json({
        name,
        fullName,
        age,
        faculty,
        weightedAverage,
        _id,
    })
})


module.exports.routerStudent = router