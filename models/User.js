const Sequelize = require('sequelize');
const sequelize = require('../config/database.js');

var User = sequelize.define('Useri', {
    id_user: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nume_user: Sequelize.STRING,
    prenume_user: Sequelize.STRING,
    mail: Sequelize.STRING,
    parola: Sequelize.STRING
});

module.exports = User;