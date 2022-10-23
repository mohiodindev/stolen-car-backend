const User = require("../../models/user_model");
const { RENDER_BAD_REQUEST } = require("../../utils/error_codes");
const { SEND_MAIL } = require("../../utils/utils");
const forgot_password = async (req, res) => {
  try {
    if (!req.body.email) {
      return res.status(400).json({
        code: 400,
        message: "Email is required",
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

    let code = Math.floor(Math.random() * 900000);

    user.reset_password_code = code;
    await user.save();

    let subject = "Reset Password Code";
    let message = `Your Reset Password Code is ${code}`;
    await SEND_MAIL(req.body.email, subject, message);

    return res.status(200).json({
      code: 200,
      message: "Reset Password Code Sent to Your Email",
    });
  } catch (error) {
    RENDER_BAD_REQUEST(res, error);
  }
};

module.exports = forgot_password;
