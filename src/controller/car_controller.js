const Car = require("../models/car_model");
const { car_validation } = require("../utils/validations/car_validation");

// add new car

const add_car = async (req, res) => {
  try {
    let { error } = await car_validation(req.body);
    if (error) {
      return res.status(404).json({
        code: 404,
        message: error.message.replace(/\"/g, " "),
      });
    }

    let car = new Car({
      model_nimber: req.body.model_number,
      chiesses_number: req.body.chiesses_number,
      engine_number: req.body.engine_number,
      registration_number: req.body.registration_number,
      image: req.body.image,
      user: req.user._id,
    });

    await car.save();

    return res.status(200).json({
      code: 200,
      message: "Car added successfully",
      data: car,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  add_car,
};
