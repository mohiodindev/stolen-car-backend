const Joi = require("joi");

const user_validation = async (body) => {
  const schema = Joi.object({
    login_type: Joi.string().valid("cnic", "email").required(),
    cnic: Joi.string()
      .when("login_type", {
        is: "cnic",
        then: Joi.required(),
      })
      .min(13),
    email: Joi.string().when("login_type", {
      is: "email",
      then: Joi.string().required().email().min(5).max(255),
    }),

    first_name: Joi.string().when("login_type", {
      is: "email",
      then: Joi.string().required().min(3).max(255),
    }),
    last_name: Joi.string().when("login_type", {
      is: "email",
      then: Joi.string().required().min(3).max(255),
    }),
    contact_number: Joi.string().when("login_type", {
      is: "email",
      then: Joi.string().required().min(10).max(11),
    }),
    password: Joi.string().required(),
  });
  return schema.validate(body);
};

const login_validation = async (body) => {
  const schema = Joi.object({
    login_type: Joi.string().valid("cnic", "email").required(),
    cnic: Joi.string()
      .when("login_type", {
        is: "cnic",
        then: Joi.required(),
      })
      .min(13),
    email: Joi.string().when("login_type", {
      is: "email",
      then: Joi.string().required().email().min(5).max(255),
    }),

    password: Joi.string().required(),
  });
  return schema.validate(body);
};

module.exports = {
  user_validation,
  login_validation,
};
