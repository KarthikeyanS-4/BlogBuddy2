const { Sequelize } = require("sequelize");
require("dotenv").config();

const connectionString = process.env.DATABASE_URL;

const sequelize = new Sequelize(connectionString, {
    logging: true,
    
});

module.exports = sequelize;
