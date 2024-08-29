const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const { readdirSync } = require("fs");
require("dotenv").config();

// app
const app = express();

// db
// connect to mongodb

const dbUserName = encodeURIComponent(process.env.DATABASE_USERNAME);
const dbPassword = encodeURIComponent(process.env.DATABASE_PASSWORD);
const uri = `mongodb+srv://${dbUserName}:${dbPassword}@smart-buy-cluster.ewgas.mongodb.net/?retryWrites=true&w=majority&appName=smart-buy-cluster`;

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("DB CONNECTED"))
  .catch((err) => console.log(`DB CONNECTION ERR: ${err}`));

// Applying middlewares - function that runs in between
app.use(morgan("dev")); // to check routes and status on console
app.use(bodyParser.json({ limit: "2mb" })); // parse json to object
app.use(cors());

// Routes middleware ( auto load all the routes)
readdirSync("./routes").map((route) =>
  app.use("/api", require("./routes/" + route))
); // read directory adn loop through each file and apply that route as middleware ( for each route api is prefixed)

/**
 * finally it will be like
 * app.use("/api", adminRouter)
 * app.use("/api", authRouter)
 * app.use("/api", categoryRouter)
 * app.use("/api", couponRouter) etc 
 */


const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
