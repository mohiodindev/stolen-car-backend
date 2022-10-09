var express = require("express");
var router = express.Router();

const {
  signup_user,
  login_user,
  logout_user,
} = require("../controller/user_controller");

router.post("/signup_user", signup_user);
router.post("/login_user", login_user);
router.get("/logout_user", logout_user);

module.exports = router;
