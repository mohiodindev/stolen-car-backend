const Car = require("../../models/car_model");
const list_all_cars = async (req, res) => {
    try {
        let search = req.query.search;
        let page = parseInt(req.query.page);
        let limit = parseInt(req.query.limit);
        if (!page) {
            page = 1;
        }
        if (!limit) {
            limit = 10;
        }
        let skip = (page - 1) * limit;
        let query;
        if (search) {
            console.log("here");
            query = {
                $or: [
                    { model_number: { $regex: search, $options: "i" } },
                    { chiesses_number: { $regex: search, $options: "i" } },
                    { engine_number: { $regex: search, $options: "i" } },
                    { registration_number: { $regex: search, $options: "i" } },
                ],
            };
        } else {
            query = {};
        }

        let all_cars = await Car.find(query).skip(skip).limit(limit);
        let total_couint = await Car.countDocuments();
        let total_pages = Math.ceil(total_couint / limit);
        let load_more_url =
            "/car/list_all_cars?page=" + (page + 1) + "&limit=" + limit;
        res.status(200).json({
            code: 200,
            message: "List All Cars",
            total_couint: total_couint,
            total_pages: total_pages,
            load_more_url: load_more_url,
            cars: all_cars,
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = list_all_cars;