const express = require('express')
const {storeStudent} = require('../service/student.service')

const router = express.Router();

router.post('/student', async (req,res) =>{
    const {name, fullName, age, faculty, weightedAverage} = req.body
    const _id = 'xyz'

    await storeStudent({name, fullName, age, faculty, weightedAverage})

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