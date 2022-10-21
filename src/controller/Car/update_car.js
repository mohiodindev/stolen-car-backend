const {car_validation} = require("../../utils/validations/car_validation");
const Car = require("../../models/car_model");
const {delete_image_from_cloudinary, upload_image_on_cloudinary} = require("../../utils/utils");
const update_car = async (req, res) => {
    try {
        let car_id = req.params.id;
        let { error } = await car_validation(req.body);
        if (error) {
            return res.status(404).json({
                code: 404,
                message: error.message.replace(/\"/g, " "),
            });
        }

        let car = await Car.findOne({
            _id: car_id,
        });

        if (!car) {
            return res.status(400).json({
                code: 400,
                message: "Invalid Car Id ",
            });
        }

        if (req.files.image) {
            if (car.image.public_id) {
                let delete_image = await delete_image_from_cloudinary(
                    car.image.public_id
                );
            }

            let car_image = await upload_image_on_cloudinary(
                req.files.image.tempFilePath,
                "car_images"
            );

            car.image.public_id = car_image.public_id;
            car.image.url = car_image.url;
        }

        car.model_number = req.body.model_number;
        car.chiesses_number = req.body.chiesses_number;
        car.registration_number = req.body.registration_number;
        car.engine_number = req.body.engine_number;

        await car.save();

        return res.status(200).json({
            code: 200,
            message: "Car Updated Successfully",
            car,
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = update_car;