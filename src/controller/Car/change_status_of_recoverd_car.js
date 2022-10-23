const Car = require("../../models/car_model");
const change_status_of_recoverd_car = async (req, res) => {
  try {
    let recoverd_car_id = req.params.id;

    let find_car = await Car.findOne({
      _id: recoverd_car_id,
      is_found: false,
    });

    if (!find_car) {
      return res.status(400).json({
        code: 400,
        message: "No car Found Or Car has already recoverd",
      });
    }

    find_car.is_found = true;
    await find_car.save();

    return res.status(200).json({
      code: 200,
      message: "Car Status Changed Succesfully",
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = change_status_of_recoverd_car;
