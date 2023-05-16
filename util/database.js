// ? Imported a class Sequelize
const Sequelize = require("sequelize");

// ? Creating an object sequelize
const sequelize = new Sequelize("premiumexpense", "root", "qwertY@1", {
  host: "localhost",
  dialect: "mysql",
});

// ? Exporting the object created
module.exports = sequelize;
