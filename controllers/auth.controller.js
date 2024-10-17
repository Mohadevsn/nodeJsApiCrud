const User = require("../models/user.model");
const Bcrypt = require("bcrypt");
require("../routes/product.route");
const saltRounds = 10;
const { use } = require("../routes/product.route");
const jwt = require("jsonwebtoken")

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const user = User.findOne({ email: email });

    if (!user) {
      return res.status(400).json({ message: "This user already exists" });
    }

    if (!email) {
      return res
        .status(400)
        .json({ message: "one or multiple argument missing" });
    }

    const salt = Bcrypt.genSaltSync(saltRounds);
    const hashedPassword = await Bcrypt.hash(password, salt);
    const data = {
      username: username,
      email: email,
      password: hashedPassword,
    };

    await User.create(data);
    res.status(200).json({ message: "Registration completed" });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "review the request" });
    }

    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(400).json({ message: "This user doesn't exist" });
    }

    const passwordMatch = await Bcrypt.compare(password, user.password)

    if(!passwordMatch){
      return res.status(401).json({error: "Invalid credentials"})
    }

    const payload = {
      "id": user.id,
      "email": user.email,
      "username": user.username
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "1h"});

    res.cookie("token", token);


    res.status(200).json({ 
      message: "Connection successfull",
      token: token
     });
     res.end();
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const logout = async (req, res)=>{

  const token = req.cookies.token;

  if(!token){
    return res.status(401).json({message: "Unauthorized"})
  }

  try{
    res.clearCookie("token");
    res.status(200).json({message: "Bye bye"})
    res.end()
  }catch(error){
    res.status(500).json(error.message);
  }
  
}

module.exports = {
  register,
  login,
  logout
};

