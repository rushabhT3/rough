const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/users");
const dailyExpense = require("../models/expense");

exports.signUp = async (req, res) => {
  // const { name, email, password } = req.body;
  // await User.create({ name, email, password });
  // res.status(201).json({ message: "Successfully created new user:)" });
  try {
    const { name, email, password } = req.body;
    if (!name && email && password) {
      return res
        .status(400)
        .json({ error: "bad parameters: something is missing" });
    }
    // ? generating the hash value using the bycrypt
    bcrypt.hash(password, 10, async (error, hash) => {
      await User.create({ name, email, password: hash });
      res.status(201).json({ message: "Successfully created new user:)" });
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

generateAccessToken = (id) => {
  return jwt.sign({ jwtId: id, name: "rushabh" }, "secretkey2");
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const foundUser = await User.findOne({ where: { email } });
    if (foundUser) {
      // ? compare with the hash with the non hash value and callback me error k baad result hain and result != res
      bcrypt.compare(password, foundUser.password, (error, result) => {
        if (result) {
          // console.log(foundUser);
          res.status(200).json({
            message: "Successfully Logged In",
            token: generateAccessToken(foundUser.id),
          });
        } else {
          res.json({ message: "Password is wrong" });
        }
      });
    } else {
      // Redirect the user to the signup page
      // res.redirect("../public/signUp/signUp.html");
      res.json({ message: "User not found in table" });
    }
  } catch (error) {
    console.log("login error");
    res.status(500).json({ message: error });
  }
};

exports.postdailyExpense = async (req, res) => {
  try {
    const { amount, description, category } = req.body;
    // console.log(req.body);
    const response = await dailyExpense.create({
      amount,
      description,
      category,
      UserId: req.authUser.id,
    });
    // ? sent response here
    res.json(response);
  } catch (error) {
    console.log("error in controller post expense");
  }
};

exports.getdailyExpense = async (req, res) => {
  try {
    const response = await dailyExpense.findAll({
      where: { UserId: req.authUser.id },
    });
    res.json(response);
  } catch (error) {
    console.log("error in getdailyexpense controller");
  }
};

exports.deleteExpense = async (req, res) => {
  try {
    // ? params are used to retrieve data from the URL, while body is used to retrieve data from the request.
    // ? The .query method is used to retrieve data from the query string
    const { id } = req.params;
    const expense = await dailyExpense.findOne({
      where: { id: id, UserId: req.authUser.id },
    });
    if (expense) {
      await expense.destroy();
      res.json({ message: "Expense deleted successfully" });
    } else {
      res.status(404).json({ message: "Expense not found" });
    }
  } catch (error) {
    console.log("deleteExpense Controller problem");
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.random = async (req, res) => {
  try {
    res.send("hi this is random");
  } catch (error) {
    console.log("random controller problem");
  }
};
