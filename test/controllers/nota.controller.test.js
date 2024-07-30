const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../src/app');
const Nota = require('../../src/models/nota.model');


beforeAll(async () => {
    const url = `mongodb://127.0.0.1/notas_test`;
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
    }
  });


afterEach(async () => {
  await Nota.deleteMany();
});


afterAll(async () => {
  await mongoose.connection.close();
});

describe('Notas API', () => {
  it('Debe ingresar una nueva nota', async () => {
    const nuevaNota = {
      practica: 15,
      medioCurso: 18,
      final: 17
    };

    const response = await request(app)
      .post('/api/notas')
      .send(nuevaNota);

    expect(response.status).toBe(201);
    expect(response.body.practica).toBe(nuevaNota.practica);
    expect(response.body.medioCurso).toBe(nuevaNota.medioCurso);
    expect(response.body.final).toBe(nuevaNota.final);
  });

  /** 

  it('Debe obtener todas las notas', async () => {
    await Nota.create({
      practica: 15,
      medioCurso: 18,
      final: 17
    });

    const response = await request(app).get('/api/notas');

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0].practica).toBe(15);
  });
  */

  it('Debe actualizar una nota existente', async () => {
    const nota = await Nota.create({
      practica: 15,
      medioCurso: 18,
      final: 17
    });

    const actualizacion = {
      practica: 16,
      medioCurso: 19,
      final: 18
    };

    const response = await request(app)
      .put(`/api/notas/${nota._id}`)
      .send(actualizacion);

    expect(response.status).toBe(200);
    expect(response.body.practica).toBe(actualizacion.practica);
    expect(response.body.medioCurso).toBe(actualizacion.medioCurso);
    expect(response.body.final).toBe(actualizacion.final);
  });

  it('Debe retornar error si las notas no están en el rango de 0 a 20', async () => {
    const notaInvalida = {
      practica: 25,
      medioCurso: 18,
      final: 17
    };

    const response = await request(app)
      .post('/api/notas')
      .send(notaInvalida);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Notas deben estar en el rango de 0 a 20');
  });
});
