var express = require("express");
var router = express.Router();

const {
  add_car,
  list_all_cars,
  // search_car,
  detail_car_by,
  delete_car_by_id,
  update_car,
} = require("../controller/car_controller");

const authebtication = require("../midleware/auth_middleware");
const admin_auth = require("../midleware/admin_authentication");
const admin_police_auth = require("../midleware/admin_poilce_authentication");

router.post("/add_car", authebtication, add_car);
router.get("/list_all_cars", list_all_cars);
router.get("/detail_car_by_id/:id", detail_car_by);
router.delete(
  "/delete_car_by_id/:id",
  authebtication,
  admin_auth,
  delete_car_by_id
);
router.put("/update_car/:id", authebtication, admin_police_auth, update_car);
// router.get("/search_car", search_car);

module.exports = router;
