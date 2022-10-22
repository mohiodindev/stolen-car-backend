const express = require("express");
const router = express.Router();
const {
  signup_user,
  login_user,
  logout_user,
  update_profile,
  change_password,
  delete_user_account,
  delete_user_account_by_admin,
} = require("../controller/User/index");
const authebtication = require("../midleware/auth_middleware");
const admin_auth = require("../midleware/admin_authentication");
router.post("/signup_user", signup_user);
router.post("/login_user", login_user);
router.post("/change_password", authebtication, change_password);
router.get("/logout_user", logout_user);
router.put("/update_profile", authebtication, update_profile);
router.delete("/delete_user_account", authebtication, delete_user_account);
router.delete(
  "/delete_user_account_by_admin/:id",
  authebtication,
  admin_auth,
  delete_user_account_by_admin
);
module.exports = router;
