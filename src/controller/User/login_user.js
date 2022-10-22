const { login_validation } = require("../../utils/validations/user_validation");
const User = require("../../models/user_model");
const jwt = require("jsonwebtoken");
const login_user = async (req, res) => {
  // validate the data before we a user

  const { error } = await login_validation(req.body);

  if (error) {
    return res.status(404).json({
      code: 404,
      message: error.message.replace(/\"/g, " "),
    });
  }
  // check login type
  let login_type = req.body.login_type;
  let user;
  if (login_type === "cnic") {
    // if login type is cnic then check if user exists with this cnic
    // check if the user is in the database
    user = await User.findOne({ cnic: req.body.cnic });
    if (!user) {
      return res.status(404).json({
        code: 404,
        message: "User not found with this cnic",
      });
    }
  } else if (login_type === "email") {
    // if login type is email then check if user exists with this email
    // check if the email exists
    user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({
        code: 404,
        message: "User not found with this email",
      });
    }
  }

  // check if the password is correct
  const isMatch = await user.comparePassword(req.body.password);
  if (!isMatch) {
    return res.status(404).json({
      code: 404,
      message: "Incorrect password",
    });
  }

  // if user_type === user
  let login_by = "";
  if (user.user_type === "user") {
    login_by = "user";
  } else if (user.user_type === "admin") {
    login_by = "admin";
  } else if (user.user_type === "police") {
    login_by = "police";
  }

  let token = jwt.sign(
    {
      _id: user._id,
      login_by: login_by,
    },
    process.env.TOKEN_SECRET
  );

  user.tokens = user.tokens.concat({ token: token });

  return res.status(200).json({
    code: 200,
    message: "User logged in successfully",
    user: user,
    token: token,
  });
};

module.exports = login_user;
