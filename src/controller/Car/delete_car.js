const Car = require("../../models/car_model");
const {delete_image_from_cloudinary} = require("../../utils/utils");
const delete_car_by_id = async (req, res) => {
    try {
        let car_id = req.params.id;

        let car = await Car.findOne({
            _id: car_id,
        });

        if (!car) {
            return res.status(400).json({
                code: 400,
                message: "Invalid Car Id ",
            });
        }

        if (car.image.public_id) {
            await delete_image_from_cloudinary(car.image.public_id);
        }

        car = await Car.findOneAndDelete({
            _id: car_id,
        }).exec();

        return res.status(200).json({
            code: 200,
            message: "Car Deleted Successfully",
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = delete_car_by_id;