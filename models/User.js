const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String,
});

userSchema.pre("save", function (next) {
  const user = this;

  // generate salt asynchronously
  bcrypt.genSalt(10, function (err, salt) {
    if (err) {
      return next(err);
    }

    // generate hash asyncronously and assign it to password
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) {
        return next(err);
      }

      user.password = hash;
      next();
    });
  });
});

userSchema.method.comparePassword = function (candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) {
      return callback(err);
    }

    callback(null, isMatch);
  });
};

const User = mongoose.model("User", userSchema);

module.exports = User;
