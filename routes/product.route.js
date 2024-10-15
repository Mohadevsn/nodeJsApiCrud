const express = require("express");
const Product = require("../models/product.model.js");
const router = express.Router();
const {getAllProduct, getSingleProduct, createProduct, updateProduct, deleteProduct} = require("../controllers/product.controller.js")

router.get("/", getAllProduct);

router.get("/:id", getSingleProduct);

router.post("/add", createProduct);

router.put("/update/:id", updateProduct);

router.delete("/delete/:id", deleteProduct);



module.exports = router;