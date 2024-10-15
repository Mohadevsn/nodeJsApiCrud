const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/product.model.js");
const ProductRoute = require("./routes/product.route.js");
const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}))

// routes

app.use("/api/products", ProductRoute)


app.get("/", (req, res) => {
  res.send("Hello from node API dev");
});


// start the api and connect to the mongo db database

mongoose
  .connect(
    "mongodb+srv://mohawade23:ohReXY4XRVZsTKA3@nodebackenddb.i6fwf.mongodb.net/?retryWrites=true&w=majority&appName=nodeBackendDb"
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
