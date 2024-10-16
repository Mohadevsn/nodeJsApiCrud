const jwt = require("jsonwebtoken");

const verifyjwt = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res
      .status(400)
      .json({ error: "session expired , log in or register" });
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (error) {
    res.clearCookie("token");
    res.status(401).json({ error: "Unauthorized! log in or register" });
  }
};

module.exports = verifyjwt;
