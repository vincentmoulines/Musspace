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
  const { link, title, artistName } = req.body;
  const authorID = req.user._id;
  const newSong = new Song({ link, title, author: authorID, artistName });
  newSong.save((err, song) => {
    if (err) {
      next(err);
    } else {
      res.redirect("/dashboard");
    }
  });
});

router.post("/vote", (req, res, next) => {
  const { target, up } = req.body;

  Song.findById(target, (err, song) => {
    if (err) {
      console.log("err");
    } else {
      song.score = up === "yes" ? song.score + 1 : song.score - 1;
      song.save();
      res.send({ currentScore: song.score });
    }
  });
});

module.exports = router;
