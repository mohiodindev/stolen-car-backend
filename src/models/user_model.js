const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const _ = require("lodash");

const UserSchema = new mongoose.Schema({
  first_name: {
    type: String,
    default: "",
  },
  last_name: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    default: "",
  },
  contact_number: {
    type: String,
    default: "0000000000",
  },
  password: {
    type: String,
  },

  cnic: {
    type: String,
    default: "",
  },

  login_type: {
    type: String,
    enum: ["cnic", "email", "police"],
  },

  tokens: [
    {
      token: {
        type: String,
      },
    },
  ],

  user_type: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },

  status: {
    type: Boolean,
    default: true,
  },
  image: {
    public_id: {
      type: String,
    },
    url: {
      type: String,
    },
  },

  reset_password_code: {
    type: String,
    default: "",
  },
});
UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.comparePassword = async function (candidatePassword, next) {
  const user = this;
  const isMatch = await bcrypt.compare(candidatePassword, user.password);
  return isMatch;
};

UserSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  return _.pick(userObject, [
    "_id",
    "first_name",
    "last_name",
    "email",
    "contact_number",
    "reset_password_code",
    "cnic",
    "login_type",
    "user_type",
    "status",
    "image",
  ]);
};

module.exports = mongoose.model("user", UserSchema);
