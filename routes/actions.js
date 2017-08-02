const express = require("express");
const Song = require("../models/song");
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

router.post("/new", (req, res) => {
  const { link, title } = req.body;
  const authorID = req.user._id;
  const newSong = new Song({ url: link, title, author: authorID });
  newSong.save((err, song) => {
    if (err) {
      return err;
    }
    res.redirect("/");
  });
});

module.exports = router;
