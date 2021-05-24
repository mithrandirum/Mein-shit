const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Post = require("../models/Post");

const ProfileSchema = new Schema({
  description: String,

  social: {
    facebook: {
      type: String,
    },
    instagram: {
      type: String,
    },
    youtube: {
      type: String,
    },
  },

  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },

  image: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

ProfileSchema.post("findOneAndRemove", async function () {
  await Post.deleteMany({ user: this.user });
});

module.exports = mongoose.model("profile", ProfileSchema);
