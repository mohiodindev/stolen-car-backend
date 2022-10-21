const express = require("express");
const router = express.Router();
const {signup_user, login_user, logout_user} = require("../controller/User/index");
router.post("/signup_user", signup_user);
router.post("/login_user", login_user);
router.get("/logout_user", logout_user);
module.exports = router;
