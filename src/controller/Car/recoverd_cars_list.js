const Car = require("../../models/car_model");
const list_recoverd_cars = async (req, res) => {
    try {
        let recoverd_cars = await Car.find({
            is_found: true,
        });
        return res.status(200).json({
            code: 200,
            message: "List All Cars Recoverd",
            recoverd_cars: recoverd_cars,
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = list_recoverd_cars;