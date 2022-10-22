const User = require("../../models/user_model");
const { RENDER_BAD_REQUEST } = require("../../utils/error_codes");

const {
  change_password_validation,
} = require("../../utils/validations/user_validation");

const change_password = async (req, res) => {
  try {
    let { error } = await change_password_validation(req.body);
    if (error) {
      return res.status(404).json({
        code: 404,
        message: error.message.replace(/\"/g, " "),
      });
    }

    let user = await User.findOne({
      _id: req.user._id,
    });
    if (!user) {
      return res.status(400).json({
        code: 400,
        message: "User not Exist ",
      });
    }

    const isMatch = await user.comparePassword(req.body.old_password);
    if (!isMatch) {
      return res.status(404).json({
        code: 404,
        message: "Incorrect Old Password",
      });
    }

    if (
      req.body.new_password.toString() !== req.body.confirm_password.toString()
    ) {
      return res.status(400).json({
        code: 400,
        message: "Password and Confirm Password Should be Same",
      });
    }

    user.password = req.body.new_password;
    await user.save();
    return res.status(200).json({
      code: 200,
      message: "Password Changed Successfully",
    });
  } catch (error) {
    RENDER_BAD_REQUEST(res, error);
  }
};

module.exports = change_password;
