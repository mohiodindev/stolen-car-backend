var express = require("express");
var router = express.Router();

const { add_car } = require("../controller/car_controller");

const authebtication = require("../midleware/auth_middleware");

router.post("/add_car", authebtication, add_car);

module.exports = router;
