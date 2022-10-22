const User = require("../../models/user_model");
const {
  update_user_profile_validation,
} = require("../../utils/validations/user_validation");
const { upload_image_on_cloudinary } = require("../../utils/utils");

const update_profile = async (req, res) => {
  try {
    let { error } = await update_user_profile_validation(req.body);
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

    let image_path;

    if (
      req.files &&
      req.files.image !== null &&
      req.files.image !== undefined &&
      req.files.image !== ""
    ) {
      image_path = await upload_image_on_cloudinary(
        req.files.image.tempFilePath,
        "user_image"
      );
      user.image.url = image_path.secure_url;
      user.image.public_id = image_path.public_id;
    }

    user.first_name = req.body.first_name;
    user.last_name = req.body.last_name;
    user.contact_number = req.body.contact_number;

    await user.save();

    return res.status(200).json({
      code: 200,
      message: "Profile Updated Successfully",
      user: user,
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: "Something went Wrong",
    });
  }
};

module.exports = update_profile;
