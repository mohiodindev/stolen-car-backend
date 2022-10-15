const jwt = require("jsonwebtoken");
const User = require("../models/user_model");

const admin_police_auth = async (req, res, next) => {
  let user = req.user;

  if (user.user_type === "admin" || user.user_type === "police") {
    next();
  } else {
    return res.status(403).json({
      code: 403,
      message: "Access Denied...",
    });
  }
};

module.exports = admin_police_auth;
