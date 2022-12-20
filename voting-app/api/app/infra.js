const Sequelize = require("sequelize");
const model = require("./model.js")

const USER = process.env.POSTGRES_USER
const PASSWORD = process.env.POSTGRES_PASSWORD
const DATABASE = process.env.POSTGRES_DATABASE
const HOST = process.env.POSTGRES_HOST

const sequelize = new Sequelize(DATABASE, USER, PASSWORD, {
    host: HOST,
    dialect: "postgres"
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.voting = model(sequelize, Sequelize);

module.exports = db;