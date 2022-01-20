const Sequelize = require('sequelize');
const sequelize = require('../config/database.js');

var User = sequelize.define('Useri', {
    id_user: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nume_user: {
        type: Sequelize.STRING
    },
    prenume_user: {
        type: Sequelize.STRING
    },
    mail: {
        type: Sequelize.STRING
    },
    parola: {
        type: Sequelize.STRING
    }
});

module.exports = User;