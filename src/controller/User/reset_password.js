const User = require("../../models/user_model");
const { RENDER_BAD_REQUEST } = require("../../utils/error_codes");
const { SEND_MAIL } = require("../../utils/utils");
const {
  reset_password_validation,
} = require("../../utils/validations/user_validation");
const reset_password = async (req, res) => {
  try {
    const { error } = await reset_password_validation(req.body);
    if (error) {
      return res.status(400).json({
        code: 400,
        message: error.details[0].message.replace(/"/g, ""),
      });
    }

    let user = await User.findOne({
      email: req.body.email,
    });

    if (!user) {
      return res.status(400).json({
        code: 400,
        message: "User Not Exist in Our Records",
      });
    }

    if (user.reset_password_code != req.body.code) {
      return res.status(400).json({
        code: 400,
        message: "Invalid Code",
      });
    }

    user.password = req.body.password;
    user.reset_password_code = "";
    await user.save();

    return res.status(200).json({
      code: 200,
      message: "Password Reset Successfully",
    });
  } catch (error) {
    RENDER_BAD_REQUEST(res, error);
  }
};

module.exports = reset_password;
