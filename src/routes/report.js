var express = require("express");
var router = express.Router();

const {
  generate_report_of_all_cars,
  get_all_reports,
  delete_reports,
} = require("../controller/Reports/index");

const authebtication = require("../midleware/auth_middleware");
const admin_auth = require("../midleware/admin_authentication");

router.get(
  "/generate_report_of_all_cars",
  authebtication,
  admin_auth,
  generate_report_of_all_cars,
  delete_reports
);
router.get("/get_all_reports", authebtication, admin_auth, get_all_reports);
router.delete("/delete_reports", authebtication, admin_auth, delete_reports);

module.exports = router;
