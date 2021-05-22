const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  text: String,

  image: {
    type: String,
  },

  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },

  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    },
  ],

  comments: [
    {
      comment: String,
      user: {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
      userImage: String,
      userPsuedo: String,
    },
  ],

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("post", PostSchema);
