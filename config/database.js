const Sequelize = require('sequelize');
module.exports = new Sequelize({
    host: 'localhost',
    dialect: 'sqlite',
    storage: './WasteFood.db'
})

