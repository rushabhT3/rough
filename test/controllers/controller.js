const { sequelize, User } = require("../models/database");
const path = require("path");

exports.createUser = async (req, res) => {
  const { name, phone, email } = req.body;
  const user = await User.create({ name, phone, email });
  res.send(`User created with ID ${user.id}`);
};

exports.getUsers = async (req, res) => {
  const users = await User.findAll();
  console.log(users)
  res.send(users);
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  await User.destroy({ where: { id } });
  res.send(`User with ID ${id} deleted`);
};

exports.home = (req, res) => {
  res.send("Home page");
};

exports.about = (req, res) => {
  res.sendFile(path.join(__dirname, "../views/show.html"));
};

