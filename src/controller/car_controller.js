const Car = require("../models/car_model");
const { car_validation } = require("../utils/validations/car_validation");

const {
  upload_image_on_cloudinary,
  delete_image_from_cloudinary,
} = require("../utils/utils");

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

    // let {
    //   model_nimber,
    //   chiesses_number,
    //   engine_number,
    //   registration_number,
    //   image,
    // } = req.body;

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

    // console.log(car_image);

    let car = new Car({
      model_nimber: req.body.model_number,
      chiesses_number: req.body.chiesses_number,
      engine_number: req.body.engine_number,
      registration_number: req.body.registration_number,
      image: {
        url: car_image.url,
        public_id: car_image.public_id,
      },
      user: req.user._id,
    });

    // let user = req.user._id;

    // let car = new Car(req.body, user);

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

// lidt all cars

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

// search car

// const search_car = async (req, res) => {
//   try {
//     let search = req.query.search;

//     let search_car = await Car.find({
//       $or: [
//         { model_number: { $regex: search, $options: "i" } },
//         { chiesses_number: { $regex: search, $options: "i" } },
//         { engine_number: { $regex: search, $options: "i" } },
//         { registration_number: { $regex: search, $options: "i" } },
//       ],
//     });

//     res.status(200).json({
//       code: 200,
//       message: "Car Result by Search",
//       cars: search_car,
//     });
//   } catch (error) {
//     return res.status(500).json({ error: error.message });
//   }
// };

// detail car by id

const detail_car_by = async (req, res) => {
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

// delete car by id

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

// update car data

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

module.exports = {
  add_car,
  list_all_cars,
  detail_car_by,
  delete_car_by_id,
  update_car,
};
