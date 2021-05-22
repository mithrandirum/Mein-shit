const jwt = require("jsonwebtoken");
const User = require("../models/User");

const auth = async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    const token = req.headers.authorization.split(" ")[1];

    console.log("this is the token ==", token);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    try {
      const user = await User.findById({ _id: decoded.id });

      req.user = user;
    } catch (error) {
      console.log(error);
      return res.status(500).json([{ msg: error.message }]);
    }
  }

  next();
};

module.exports = auth;
