const mongoose = require("mongoose");
const bbcrypto = require("bcrypt");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Post = require("./Post");

const userSchema = new mongoose.Schema({
  psuedo: {
    type: String,
    unique: [true, "this psuedo is aleady taken"],
  },

  email: {
    type: String,
    trim: true,
    unique: true,
    required: "Email address is required",
  },
  password: {
    type: String,
    minLength: [6, "password must be at 6 carachter long"],
  },

  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
});

userSchema.post("save", async function () {
  const deletedPosts = await Post.findByIdAndRemove({ _id: this._id });
  console.log(deletedPosts);
  return deletedPosts;
});

// userSchema.pre("save", async function () {
//   const salt = await bcrypt.genSalt(12);
//   this.password = await bcrypt.hash(this.password, salt);
// });

userSchema.methods.signJwtToken = function () {
  console.log("ran");
  const token = jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "10 days",
  });
  return token;
};

// userSchema.methods.comparePassword = async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };

module.exports = mongoose.model("user", userSchema);
