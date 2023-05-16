const express = require("express");
const cors = require("cors");
const port = 3000;

const routes = require("./routes/router");
const purchaseRoutes = require("./routes/razorpayroutes");

const sequelize = require("./util/database");

const User = require("./models/users");
const dailyExpense = require("./models/expense");
const Order = require("./models/orders");

const app = express();

const dotenv = require("dotenv");
dotenv.config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use("/purchase", purchaseRoutes);
app.use("/", routes);

User.hasMany(dailyExpense);
dailyExpense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

sequelize.sync().then(
  app.listen(port, () => {
    console.log(`listening on port: ${port}`);
  })
);
