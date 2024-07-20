const request = require('supertest')
const {app} = require('../../server')
const {BuilderStudent} = require('../builders/student.builder')


describe('POST /student',() =>{
    test('Should store a new student', async () =>{
        const student = BuilderStudent.student()
        const response = await request(app)
        .post('/student')
        .send(student)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201)

    expect(response.body).toEqual({
            ...student,
            _id : 'xyz',
        })
    })

})