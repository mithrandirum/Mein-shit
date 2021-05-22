const Post = require("../models/Post");
const Profile = require("../models/Profile");

const path = require("path");

exports.createPost = async (req, res) => {
  const user = req.user;

  const { image, text } = req.body;

  try {
    const userPosts = await Post.find({ user: user.id });

    if (
      !req.files ||
      !req.files.file ||
      !req.files.file.mimetype.startsWith("image")
    ) {
      return res.status(400).json({ errors: ["please upload an image file"] });
    }
    const file = req.files.file;
    console.log(req);

    file.name = `photo_${req.user._id}${userPosts.length + 1}${
      path.parse(file.name).ext
    }`;

    file.mv(
      `${__dirname}/../client/public/postImage/${file.name}`,
      async (err) => {
        if (err) {
          console.error(err);
          return res.status(400).json({ errors: ["failed to add image"] });
        }
      }
    );

    const newPost = new Post({
      text,
      image: file.name,
      user: user.id,
    });

    const post = await newPost.save();

    if (post) res.status(200).json(post);
  } catch (err) {
    console.error(err);
    res.status(500).send("server error");
  }
};

//get post by its id

exports.getPost = async (req, res) => {
  const postId = req.params.postId;
  try {
    const post = await Post.find({ _id: postId });

    if (!post) return res.status(404).send("theres' no post with that Id");

    res.status(200).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).send("server erorr");
  }
};

exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find();

    if (!posts) return res.status(404).send("theres' no posts");

    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).send("server erorr");
  }
};

exports.getUserPosts = async (req, res) => {
  const user = req.user;

  try {
    const userPosts = await Post.find({ user: user.id });

    if (!userPosts)
      return res.status(404).send("users did not posted anything yet");

    res.status(200).json(userPosts);
  } catch (error) {
    console.error(error);
    res.status(500).send("server erorr");
  }
};

//get userPosts by Id

exports.getUserPostById = async (req, res) => {
  const id = req.params.id;

  try {
    const userPosts = await Post.find({ user: id });

    if (!userPosts)
      return res.status(404).send("users did not posted anything yet");

    res.status(200).json(userPosts);
  } catch (error) {
    console.error(error);
    res.status(500).send("server erorr");
  }
};

exports.addComment = async (req, res) => {
  const postId = req.params.postId;

  const user = req.user;

  const comment = req.body.comment;

  try {
    const profile = await Profile.findOne({ user: user.id });

    const foundPost = await Post.findById({
      _id: postId,
    });

    if (!foundPost) return res.status(400).send("Post not found");

    if (!req.user) return res.status(401).send("log in to make this action");

    const updatedPost = await Post.updateOne(
      { _id: foundPost._id },
      {
        $push: {
          comments: {
            user: user.id,
            comment,
            userImage: profile.image,
            userPsuedo: user.psuedo,
          },
        },
      },
      { runValidators: true }
    );

    if (!updatedPost) return res.status(400).send("post did not update");

    const fr = await Post.findById({ _id: postId });

    res.status(200).json(fr);
  } catch (error) {
    console.error(error);
    res.status(500).send("server error");
  }
};
//delete comment
exports.deleteComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);

    // Pull out comment
    const comment = post.comments.find(
      (comment) => comment.id === req.params.commentId
    );

    // Make sure comment exists
    if (!comment) {
      return res.status(404).json({ msg: "Comment does not exist" });
    }
    // Check user
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    post.comments = post.comments.filter(
      ({ id }) => id !== req.params.commentId
    );

    await post.save();

    return res.json(post.comments);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
};

exports.likeAdd = async (req, res) => {
  const postId = req.params.postId;

  const user = req.user;

  try {
    const foundPost = await Post.findById({ _id: postId });

    if (!foundPost) return res.status(400).send("Post not found");

    if (!req.user) return res.status(401).send("log in to make this action");

    if (foundPost.likes.find((el) => el.user.toString() === user.id))
      return res.status(400).send("you have already liked this post");

    const updatedPost = await Post.updateOne(
      { _id: foundPost._id },
      { $push: { likes: { user: user.id } } },
      { runValidators: true }
    );

    if (!updatedPost) return res.status(400).send("post did not update");

    const fr = await Post.findById({ _id: postId });

    res.status(200).json(fr);
  } catch (error) {
    console.error(error);
    res.status(500).send("server error");
  }
};

exports.removeLike = async (req, res) => {
  const postId = req.params.postId;

  const user = req.user;

  try {
    const foundPost = await Post.findOne({ _id: postId });

    if (!foundPost) return res.status(400).send("Post not found");

    if (!req.user) return res.status(401).send("log in to make this action");

    if (!foundPost.likes.find((el) => el.user.toString() === user.id))
      return res.status(400).send("you cannot dislike this post");

    const filtered = foundPost.likes.filter(
      (like) => like.user.toString() !== user.id
    );

    //   const updatedPost = await Post.updateOne(
    //     { _id: foundPost._id },
    //     { $push: { likes: { user: user.id } } },
    //     { runValidators: true }
    //   );

    const uu = await Post.updateOne({ _id: postId }, { likes: filtered });

    if (!uu) return res.status(400).send("post did not update");

    const fr = await Post.findById({ _id: postId });

    res.status(200).json(fr);
  } catch (error) {
    console.error(error);
    res.status(500).send("server error");
  }
};

exports.removePost = async (req, res) => {
  const postId = req.params.postId;
  const user = req.user;

  try {
    const foundPost = await Post.find({ _id: postId });

    if (!foundPost) return res.status(400).send("Post not found");
    console.log(user.id, foundPost[0].user);

    if (user.id !== foundPost[0].user.toString())
      return res.status(401).send("unauthorized , post is not yours to delete");

    const deleted = await Post.findOneAndRemove({ _id: postId });

    if (!deleted) return res.status(400).send("could not delete");

    res.status(200).json(deleted);
  } catch (error) {
    console.error(error);
    res.status(500).send("server error");
  }
};
