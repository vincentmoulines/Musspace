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

const youtube_parser = function(url) {
  var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
  var match = url.match(regExp);
  return match && match[7].length == 11 ? match[7] : false;
};

router.get("/dashboard", ensureLoggedIn("/"), (req, res, next) => {
  res.locals.currentMessage = "Welcome, " + res.locals.user.email + " !";
  Song.find({}).sort("-score").exec().then(list => {
    res.render("dashboards/dashboard", {
      user: res.locals.user,
      message: res.locals.currentMessage,
      list,
      youtube_parser
    });
  });
});

module.exports = router;
