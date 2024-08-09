const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const notaRoutes = require('./routes/nota.routes');
const cursoRoutes = require('./routes/curso.routes');

const app = express();

const mongoUri = process.env.MONGODB_URI || 'mongodb+srv://igorramoscruzadow:DfNHADURyRRp1Td9@bd-foto-bid.ym97ga4.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));
app.use('/api/notas', notaRoutes);
app.use('/api/curso', cursoRoutes); 

module.exports = app;
