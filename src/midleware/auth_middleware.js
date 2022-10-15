const jwt = require("jsonwebtoken");
const User = require("../models/user_model");

const authebtication = async (req, res, next) => {
  try {
    console.log("hdhhdhhhdhd");
    let token = req.header("x-sh-auth");
    if (!token)
      return res.status(401).json({ code: 401, message: "Login First? ..." });

    let decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    let user = await User.findOne({ _id: decoded._id });
    if (!user) {
      return res.status(401).json({ code: 401, message: "Login First? ..." });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      code: 401,
      message: error.message,
    });
  }
};

module.exports = authebtication;
