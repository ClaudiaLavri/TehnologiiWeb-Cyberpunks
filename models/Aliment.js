const Sequelize = require('sequelize');
const sequelize = require('../config/database.js');

const Aliment = sequelize.define('Alimente', {
    id_aliment: {
        type: Sequelize.INTEGER,
    },

    nume_aliment: {
        type: Sequelize.STRING
    },
    categorie: {
        type: Sequelize.STRING
    },
    data_expirare: {
        type: Sequelize.DATEONLY
    },
    id_user: {
        type: Sequelize.INTEGER
    }
});

module.exports = Aliment;