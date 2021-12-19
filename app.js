const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

//initializare sequelize
const Sequelize = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './WasteFood.db'
})

//conectare sqlite
sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.log('Unable to connect to the database: ', err);
    });

sequelize.getQueryInterface().showAllSchemas().then((tableObj) => {
    console.log(tableObj);
    // console.log(tableObj.keys(rawAttributes));
});

var Useri = sequelize.define('Useri', {
    id_user: Sequelize.INTEGER,
    nume_user: Sequelize.STRING,
    prenume_user: Sequelize.STRING,
    mail: Sequelize.STRING,
    parola: Sequelize.STRING
});

var Alimente = sequelize.define('Alimente', {
    id_aliment:
    {
        type: Sequelize.INTEGER
    },
    nume_aliment: {
        type: Sequelize.STRING
    },
    categorie: {
        type: Sequelize.STRING
    },
    data_expirare:
    {
        type: Sequelize.DATE
    },
    id_user: {
        type: Sequelize.INTEGER
    }
});

var Grupuri = sequelize.define("Grupuri", {
    id_grup: Sequelize.INTEGER,
    id_user: Sequelize.INTEGER,
    id_user_detinator: Sequelize.INTEGER,
    nume_grup: Sequelize.STRING
});

var Rezervari = sequelize.define("Rezervari", {
    id_rezervare: Sequelize.INTEGER,
    id_user: Sequelize.INTEGER,
    id_aliment: Sequelize.INTEGER
});

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
module.exports = Alimente;