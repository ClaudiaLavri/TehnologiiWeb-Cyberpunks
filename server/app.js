const express = require('express');
const app = express();

const rezRoutes = require('.././api/routes/rezervari');
const alimRoutes = require('.././api/routes/alimente');

app.use('/alimente', alimRoutes);
app.use('/rezervari', rezRoutes);

module.exports = app;