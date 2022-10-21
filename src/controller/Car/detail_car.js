const Car = require("../../models/car_model");
const detail_car_by_id = async (req, res) => {
    try {
        let detail_car = await Car.findOne({
            _id: req.params.id,
        }).populate("user", "first_name last_name email");
        if (!detail_car) {
            return res.status(400).json({
                code: 400,
                message: "No Car Exist or Invaild Id",
            });
        }

        res.status(200).json({
            code: 200,
            message: "Car Detail",
            car: detail_car,
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = detail_car_by_id;
