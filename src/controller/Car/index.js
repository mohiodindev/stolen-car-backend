const add_car = require("./add_car");
const list_all_cars = require("./list_all_cars");
const list_recoverd_cars = require("./recoverd_cars_list");
const change_status_of_recoverd_car = require("./change_status_of_recoverd_car");
const update_car = require("./update_car");
const delete_car = require("./delete_car");
const get_car_by_id = require("./detail_car");

module.exports = {
  add_car,
  list_all_cars,
  list_recoverd_cars,
  change_status_of_recoverd_car,
  update_car,
  delete_car,
  get_car_by_id,
};
