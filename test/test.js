const express = require("express");
const path = require("path");
const app = express();
const cors = require('cors');
const port = 8080;
const routes = require("./routes/router");
const { sequelize, User } = require("./models/database");

// const now = path.join(__dirname, '../');
// console.log(__dirname);
// console.log(now);

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", routes);

sequelize.sync().then(
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  })
);
