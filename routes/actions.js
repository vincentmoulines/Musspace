const express = require("express");
const Song = require("../models/song");
const User = require("../models/user");
//const TYPES = require("../models/song-types");
const router = express.Router();
const passport = require("passport");
const flash = require("connect-flash");
const { ensureLoggedIn, ensureLoggedOut } = require("connect-ensure-login");
const TYPES = {};

router.get("/new", ensureLoggedIn(), (req, res) => {
  if (req.user.role !== "artist") {
    res.redirect("/dashboard");
  }
  res.render("actions/new-music", { types: TYPES });
});

router.post("/new", (req, res, next) => {
  const { link, title } = req.body;
  const authorID = req.user._id;
  const newSong = new Song({ link, title, author: authorID });
  newSong.save((err, song) => {
    if (err) {
      next(err);
    } else {
      res.redirect("/dashboard");
    }
  });
});

module.exports = router;
