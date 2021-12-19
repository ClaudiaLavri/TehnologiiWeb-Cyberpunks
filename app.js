const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

//creare rute
const rezRoutes = require('./api/routes/rezervari');
const alimRoutes = require('./api/routes/alimente');

//morgan pentru a vedea in terminal requesturile
//bodyParser pentru a ajuta la parsarea requestului trimis in aplicatii
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//adaugare headere la response pentru a evita erorile CORS
app.use((req, res, next) => {
    res.header('Acces-Control-Allow-Origin', '*');
    res.header('Acces-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method === 'OPTIONS') {
        res.header('Acces-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

//rute pentru requesturi
app.use('/alimente', alimRoutes);
app.use('/rezervari', rezRoutes);

//error management
app.use((req, res, next) => {
    const error = new Error('Not found!');
    error.status = 404;
    next(error);
});

//in caz ca nu a intrat pe error managementul de sus
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;