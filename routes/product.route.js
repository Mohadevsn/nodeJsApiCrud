const express = require("express");
const Product = require("../models/product.model.js");
const router = express.Router();
const {getAllProduct, getSingleProduct, createProduct, updateProduct, deleteProduct} = require("../controllers/product.controller.js")
const verifyjwt = require("../middleware/verifyToken.middleware")


router.get("/", verifyjwt,getAllProduct);

router.get("/:id", verifyjwt, getSingleProduct);

router.post("/add", verifyjwt, createProduct);

router.put("/update/:id", verifyjwt, updateProduct);

router.delete("/delete/:id", verifyjwt, deleteProduct);



module.exports = router;