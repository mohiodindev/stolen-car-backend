const Joi = require("joi");

const car_validation = async (body) => {
  const schema = Joi.object({
    model_number: Joi.string().required(),
    chiesses_number: Joi.string().required(),
    engine_number: Joi.string().required(),
    registration_number: Joi.string().required(),
  });
  return schema.validate(body);
};

module.exports = {
  car_validation,
};
