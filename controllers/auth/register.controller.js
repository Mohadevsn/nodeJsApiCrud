const User = require("../../models/user.model");
const Bcrypt = require("bcrypt");
require("../../routes/product.route");
const saltRounds = 10;

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const user = User.findOne({ email: email });

    if (user) {
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

module.exports = {
  register,
};
