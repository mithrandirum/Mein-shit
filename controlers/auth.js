const User = require("../models/User");
const bcrypt = require("bcryptjs");
const bbcrypto = require("bcrypt");
const jwt = require("jsonwebtoken");
Profile = require("../models/Profile");
//@register user
//@ public
//@ auth/register
exports.register = async (req, res) => {
  const { email, password, psuedo } = req.body;

  const result = validateEmail(email);
  console.log(result);

  try {
    if (!result) {
      return res.status(400).send("please fill a valid email");
    }

    if (password.length < 6) {
      return res.status(400).send("min length 6");
    }

    const match = await User.findOne({ email });
    if (match) {
      return res.status(400).send("a user with that email already exist");
    }

    const newUser = await User.create({
      email,
      password,
      psuedo,
    });

    newUser.save();

    const token = newUser.signJwtToken();

    return res.status(200).json({ token });
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
};

//@get all users
//@ public
//@ auth/users

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (!users) {
      res.status(404).json([{ msg: "no users" }]);
    }

    res.status(200).json({ users, succsess: true });
  } catch (error) {
    console.error(error.response);
    res.status(500).json([{ error: error.message }]);
  }
};

//@login user
//@ public
//@ auth/login

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const result = validateEmail(email);

  if (!result) return res.status(400).send("please enter a valid email");

  if (password.length < 6)
    return res.status(400).send("password minlength is 6");

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send("user not found");
    }

    // const isMarch = await user.comparePassword(password);

    if (user.password !== password)
      return res.status(401).send("wrong credentials");

    const token = user.signJwtToken();

    return res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    //  res.status(500).json({ errors: error.response.data });
  }
};

//@get single user
//@ private
//@ auth/users/me

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById({ _id: req.user._id }).select("-password");

    if (!user) {
      return res.status(401).json([{ msg: "unauthorized" }]);
    }

    res.status(200).json(user);
  } catch (error) {
    console.log(error.response);
    res.status(500).json([{ msg: error.message }]);
  }
};

//@update user
//@ private
//@ auth/users/update

exports.updateUser = async (req, res) => {
  const { email, password, psuedo } = req.body;

  const result = validateEmail(email);

  if (!result) {
    return res.status(400).json(["please enter a valid email"]);
  }

  if (password.length < 6) {
    return res.status(400).json(["password must be at least carachter long"]);
  }

  if (psuedo.length < 3) {
    return res.status(400).send(["psuedo min length is 3 carachter"]);
  }

  try {
    const pro = await User.findOne({ _id: req.user.id });

    if (!pro) return res.status(404).send("user does not exist");

    const obj = {
      email,
      password,
      psuedo,
    };

    const updatedUser = await User.findOneAndUpdate({ _id: pro._id }, obj, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(500).send("an error occured during updating");
    }

    await updatedUser.save();

    const token = updatedUser.signJwtToken();

    res.json({ updatedUser, token });
  } catch (error) {
    console.error(error);
    res.status(500).send("server error");
  }
};

//delete user
//@admin auth/users/delete/:id
//private

exports.deleteUser = async (req, res) => {
  try {
    if (req.params.userId !== req.user.id && req.user.role !== "admin")
      return res.status(401).send("unauthorized");

    const user = User.findById(req.params.userId);

    if (!user) return res.status(404).send("no user found with that id");

    const removed = await User.findByIdAndRemove({ _id: req.params.userId });

    if (!removed) {
      return res.status(500).send("somthing went wrong is the server side");
    }

    if (user.role !== "admin") {
      const profileRemoved = await Profile.findOneAndRemove({
        user: req.params.userId,
      });

      if (!profileRemoved) return res.status(400).json({ error: "fucking " });

      // res.json({ profileRemoved });

      return res.status(200).json({ data: {}, succsess: true });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

//validate email
function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}
