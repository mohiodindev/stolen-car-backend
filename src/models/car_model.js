const mongoos = require("mongoose");
const _ = require("lodash");

const carSchema = new mongoos.Schema(
  {
    model_number: {
      type: String,
    },
    chiesses_number: {
      type: String,
    },
    engine_number: {
      type: String,
    },
    registration_number: {
      type: String,
    },
    image: {
      type: String,
    },
    user: {
      type: mongoos.Schema.Types.ObjectId,
      ref: "user",
    },
    is_found: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

carSchema.methods.toJSON = function () {
  const car = this;
  const carObject = car.toObject();
  return _.pick(carObject, [
    "_id",
    "model_number",
    "chiesses_number",
    "engine_number",
    "registration_number",
    "image",
    "user",
    "createdAt",
    "updatedAt",
  ]);
};

module.exports = mongoos.model("car", carSchema);
