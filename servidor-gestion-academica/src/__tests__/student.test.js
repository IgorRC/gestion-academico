const request = require('supertest')
const {app} = require('../../server')
const {BuilderStudent} = require('../builders/student.builder')
const {storeStudent} = require('../service/student.service')
const { beforeEach } = require('node:test')


jest.mock('../service/student.service.js')

beforeEach(() =>{
    storeStudent.mockReset()
})

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

    test('should execute store student function', async () =>{
        const student = BuilderStudent.student()
        await request(app)
        .post('/student')
        .send(student)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201)
        
        expect(storeStudent).toHaveBeenCalledWith(student)

    })
})