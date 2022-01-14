const Sequelize = require('sequelize');
const sequelize = require('../config/database.js');

var Grup = sequelize.define("Grupuri", {
    id_grup: Sequelize.INTEGER,
    id_user: Sequelize.INTEGER,
    id_user_detinator: Sequelize.INTEGER,
    nume_grup: Sequelize.STRING
});

module.exports = Grup;