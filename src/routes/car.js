var express = require("express");
var router = express.Router();

const {
  add_car,
  list_all_cars,
  // search_car,
  detail_car_by,
  delete_car_by_id,
  update_car,
  list_all_cars_pdf,
  change_status_of_recoverd_car,
  list_recoverd_cars,
} = require("../controller/car_controller");

const authebtication = require("../midleware/auth_middleware");
const admin_auth = require("../midleware/admin_authentication");
const admin_police_auth = require("../midleware/admin_poilce_authentication");
const police_auth = require("../midleware/police_auth");
router.post("/add_car", authebtication, add_car);
router.get("/list_all_cars", list_all_cars);
router.get("/list_all_cars_pdf", list_all_cars_pdf);
router.get("/detail_car_by_id/:id", detail_car_by);
router.delete(
  "/delete_car_by_id/:id",
  authebtication,
  admin_auth,
  delete_car_by_id
);
router.put("/update_car/:id", authebtication, admin_police_auth, update_car);
router.get(
  "/change_status_of_recoverd_car/:id",
  authebtication,
  // police_auth,
  change_status_of_recoverd_car
);
router.get("/list_recoverd_cars", list_recoverd_cars);

module.exports = router;
