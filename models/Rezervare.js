const Sequelize = require('sequelize');
const sequelize = require('../config/database.js');

var Rezervare = sequelize.define("Rezervari", {
    id_rezervare: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    id_user: {
        type: Sequelize.INTEGER
    },
    id_aliment: {
        type: Sequelize.INTEGER
    }
});

module.exports = Rezervare;