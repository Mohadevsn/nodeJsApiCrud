const express = require("express");
const mongoose = require("mongoose");
const ProductRoute = require("./routes/product.route.js");
const AuthRoute =  require("./routes/auth.route.js")
const cookieParser = require("cookie-parser")
require("dotenv").config();
const app = express();


// middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use(cookieParser());


// routes

app.use("/api/products", ProductRoute)
app.use("/auth", AuthRoute)


app.get("/", (req, res) => {
  res.send("Hello from node API dev");
});


// start the api and connect to the mongo db database

mongoose
  .connect(
    process.env.MONGO_DB_URL
  )
  .then(() => {
    console.log("connected to database");
    app.listen(3000, () => {
      console.log("App is running on port 3000 !");
    });
  })
  .catch(() => {
    console.log("connection failed !!");
  });
