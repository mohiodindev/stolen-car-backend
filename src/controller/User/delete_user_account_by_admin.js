const User = require("../../models/user_model");
const { RENDER_BAD_REQUEST } = require("../../utils/error_codes");

const delete_user_account_by_admin = async (req, res) => {
  try {
    let user = await User.findOneAndDelete({
      _id: req.params.id,
    });

    if (!user) {
      return res.status(400).json({
        code: 400,
        message: "User not Exist ",
      });
    }

    return res.status(200).json({
      code: 200,
      message: "User Account Deleted Successfully",
    });
  } catch (error) {
    RENDER_BAD_REQUEST(res, error);
  }
};

module.exports = delete_user_account_by_admin;
