require("dotenv").config();
const User = require("../models/User");
const jwt = require("jwt-simple");

function tokenForUser(user) {
  const timeStamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timeStamp }, process.env.JWT_SECRET);
}

exports.signin = function (req, res, next) {
  // User already had their email and password authenticated
  // Just need to give them token

  res.send({ token: tokenForUser(req.user) });
};

// Sign Up / Registration
exports.signup = function (req, res, next) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(422)
      .send({ success: false, error: "You must provide email and password" });
  }

  // See if user with given email already exists
  User.findOne({ email: email }, (err, existingUser) => {
    if (err) {
      return next(err);
    }

    if (existingUser) {
      return res.status(422).send({ success: false, error: "Email is in use" });
    }

    // if user with email is new create new user and save to database
    const user = new User({ email: email, password: password });

    user.save(function (err, user) {
      if (err) {
        return next(err);
      }

      return res.status(200).json({ token: tokenForUser(user) });
    });
  });
};
