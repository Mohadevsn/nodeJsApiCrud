const express = require("express")
const {register, login, logout} = require("../controllers/auth.controller")
const router = express.Router();
const verifyLogin = require("../middleware/verifyIfLoged.middleware");


router.post("/register", verifyLogin,register);
router.post("/login", verifyLogin,login);
router.post("/logout", logout);


module.exports = router;
