const express = require("express");
const router = express.Router();
const ensureLogin = require("connect-ensure-login");

/* GET home page. */
router.get("/", (req, res, next) => {
  res.locals.currentMessage = res.locals.user
    ? "Welcome back, " + res.locals.user.username + " !"
    : null;
  res.render("index", { message: res.locals.currentMessage });
});

router.get("/dashboard", ensureLogin.ensureLoggedIn(), (req, res, next) => {
  res.locals.currentMessage = "Welcome, " + res.locals.user.username + " !";
  res.render("dashboard", {
    user: res.locals.user,
    message: res.locals.currentMessage
  });
});

module.exports = router;
