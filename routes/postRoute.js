const express = require("express");
const auth = require("../middleware/auth");

const router = express.Router();
const {
  createPost,
  getUserPosts,
  addComment,
  likeAdd,
  removeLike,
  deleteComment,
  getPosts,
  getPost,
  removePost,
  getUserPostById,
} = require("../controlers/post");

router.route("/").post(auth, createPost);
router.route("/user-posts").get(auth, getUserPosts);
router.route("/posts").get(getPosts);
router.route("/post/:postId").get(auth, getPost);
router.route("/:id").get(getUserPostById);
router.route("/post/:postId").delete(auth, removePost);
router.route("/add-comment/:postId").put(auth, addComment);
router.route("/remove-comment/:postId/:commentId").delete(auth, deleteComment);
router.route("/add-like/:postId").put(auth, likeAdd);
router.route("/remove-like/:postId").put(auth, removeLike);

module.exports = router;
