const { car_validation } = require("../../utils/validations/car_validation");
const { upload_image_on_cloudinary, SEND_MAIL } = require("../../utils/utils");
const Car = require("../../models/car_model");
const User = require("../../models/user_model");
const add_car = async (req, res) => {
  try {
    let { error } = await car_validation(req.body);
    if (error) {
      return res.status(404).json({
        code: 404,
        message: error.message.replace(/\"/g, " "),
      });
    }

    if (
      !req.files ||
      req.files.image === null ||
      req.files.image === undefined ||
      req.files.image === ""
    ) {
      return res.status(400).json({
        code: 400,
        message: "Please Select Image",
      });
    }

    let car_image = await upload_image_on_cloudinary(
      req.files.image.tempFilePath,
      "car_images"
    );

    let car = new Car({
      model_number: req.body.model_number,
      chiesses_number: req.body.chiesses_number,
      engine_number: req.body.engine_number,
      registration_number: req.body.registration_number,
      image: {
        url: car_image.url,
        public_id: car_image.public_id,
      },
      user: req.user._id,
    });
    await car.save();

    let admin_user = await User.findOne({
      user_type: "admin",
    });

    let subject = "New Car Added";
    let message = `New Car Added By ${req.user.first_name} with Model Number ${req.body.model_number}`;

    await SEND_MAIL(admin_user.email, subject, message);

    return res.status(200).json({
      code: 200,
      message: "Car added successfully",
      data: car,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = add_car;
