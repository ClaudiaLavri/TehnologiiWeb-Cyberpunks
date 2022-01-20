const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

//Database
const sequelize = require('./config/database.js')

//initializare sequelize

//conectare sqlite
sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.log('Unable to connect to the database: ', err);
    });

//sincronizare baza de date
// (async () => {
//     await sequelize.sync({ force: true });
// })();
// sequelize.sync({ force: true }).then(() => console.log('DB ready'));


//creare rute
const rezRoutes = require('./api/routes/rezervari');
const alimRoutes = require('./api/routes/alimente');
const usRoutes = require('./api/routes/users');
const grRoutes = require('./api/routes/grupuri');

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
app.use('/users', usRoutes);
app.use('/grupuri', grRoutes);

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