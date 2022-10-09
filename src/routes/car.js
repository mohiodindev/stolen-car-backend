var express = require("express");
var router = express.Router();

const {
  add_car,
  list_all_cars,
  search_car,
} = require("../controller/car_controller");

const authebtication = require("../midleware/auth_middleware");

router.post("/add_car", authebtication, add_car);
router.get("/list_all_cars", list_all_cars);
router.get("/search_car", search_car);

module.exports = router;
