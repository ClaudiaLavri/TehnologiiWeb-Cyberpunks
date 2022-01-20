const Sequelize = require('sequelize');
const sequelize = require('../config/database.js');

var Grup = sequelize.define("Grupuri", {
    id_grup: {
        type: Sequelize.INTEGER,
    },
    id_user: {
        type: Sequelize.INTEGER
    },
    id_user_detinator: {
        type: Sequelize.INTEGER
    },
    nume_grup: {
        type: Sequelize.STRING
    }
});

module.exports = Grup;