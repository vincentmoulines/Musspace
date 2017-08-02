const express = require("express");
const router = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require("connect-ensure-login");
const Song = require("../models/song");

router.get("/", (req, res, next) => {
  res.locals.currentMessage = res.locals.user
    ? "Welcome back, " + res.locals.user.email + " !"
    : null;
  res.render("home", {
    user: res.locals.user,
    message: res.locals.currentMessage
  });
});

router.get("/dashboard", ensureLoggedIn("/"), (req, res, next) => {
  res.locals.currentMessage = "Welcome, " + res.locals.user.email + " !";
  Song.find({}).sort("-score").exec().then(list => {
    res.render("dashboards/dashboard", {
      user: res.locals.user,
      message: res.locals.currentMessage,
      list
    });
  });
});

module.exports = router;
