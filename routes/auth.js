const express = require("express");
const auth = require("../middleware/auth");

const router = express.Router();
const {
  register,
  getUsers,
  login,
  getUser,
  updateUser,
  deleteUser,
} = require("../controlers/auth");

router.route("/register").post(register);
router.route("/users").get(getUsers);
router.route("/login").post(login);
router.route("/users/me").get(auth, getUser);
router.route("/users/update").put(auth, updateUser);
router.route("/users/delete/:userId").delete(auth, deleteUser);
module.exports = router;
