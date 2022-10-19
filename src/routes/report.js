var express = require("express");
var router = express.Router();

const { generate_report_of_all_cars } = require("../controller/report");

const authebtication = require("../midleware/auth_middleware");
const admin_auth = require("../midleware/admin_authentication");

router.get(
  "/generate_report_of_all_cars",
  authebtication,
//   admin_auth,
  generate_report_of_all_cars
);

module.exports = router;
