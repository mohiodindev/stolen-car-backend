var express = require("express");
var router = express.Router();
const {
  add_car,
  list_all_cars,
  get_car_by_id ,
  delete_car ,
  update_car,
  change_status_of_recoverd_car,
  list_recoverd_cars,
} = require("../controller/Car/index");
const authebtication = require("../midleware/auth_middleware");
const admin_auth = require("../midleware/admin_authentication");
const admin_police_auth = require("../midleware/admin_poilce_authentication");
const police_auth = require("../midleware/police_auth");
router.post("/add_car", authebtication, add_car);
router.get("/list_all_cars", list_all_cars);
router.get("/detail_car_by_id/:id", get_car_by_id);
router.delete("/delete_car_by_id/:id", authebtication, admin_auth, delete_car);
router.put("/update_car/:id", authebtication, admin_police_auth, update_car);
router.get("/change_status_of_recoverd_car/:id", authebtication,change_status_of_recoverd_car)
router.get("/list_recoverd_cars", list_recoverd_cars);

module.exports = router;
