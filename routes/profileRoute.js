const express = require("express");
const {
  uploadImage,
  createProfile,
  deleteProfile,
  getProfiles,
  updateProfile,
  getUserProfile,
  getProfileById,
} = require("../controlers/profile");
const auth = require("../middleware/auth");

const router = express.Router();

router.route("/me").get(auth, getUserProfile);
router.route("/image").post(auth, uploadImage);
router.route("/create").post(auth, createProfile);
router.route("/delete/:profileId").delete(auth, deleteProfile);
router.route("/update").put(auth, updateProfile);
router.route("/profiles").get(getProfiles);

router.route("/:profileId").get(getProfileById);

module.exports = router;
