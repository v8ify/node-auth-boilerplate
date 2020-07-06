const Authentication = require("./controllers/Authentication");
const passportService = require("./services/Passport");
const passport = require("passport");

const requireAuth = passport.authenticate("jwt", { session: false });

const requireSignin = passport.authenticate("local", { session: false });

module.exports = function (app) {
  app.get("/", requireAuth, (req, res, next) => {
    res.send({ success: true });
  });

  app.post("/signin", requireSignin, Authentication.signin);

  app.post("/signup", Authentication.signup);
};
