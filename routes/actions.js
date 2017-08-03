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

const vote = function(up, target) {
  if (up) {
    console.log("up");
    Song.findOneAndUpdate(
      { _id: ObjectId(target) },
      { $inc: { score: 1 } },
      err => {
        if (err) {
          console.log("err in cb");
        }
      }
    );
  } else {
    Song.findOneAndUpdate(
      { _id: ObjectId(target) },
      { $inc: { score: -1 } },
      () => {
        next();
      }
    );
  }
  next();
};

router.post("/vote", (req, res, next) => {
  console.log("found me");
  const { target, up } = req.body;
  console.log(up, target);
  console.log(vote);
  vote(up, target);
  if (up) {
    console.log("up");
    Song.updateOne({ _id: ObjectId(target) }, { $inc: { score: 1 } }, err => {
      console.log("entered cb");
      if (err) {
        console.log("err in cb");
      } else {
        res.json("200");
      }
    });
  } else {
    console.log("down");
    Song.findOneAndUpdate(
      { _id: ObjectId(target) },
      { $inc: { score: -1 } },
      err => {
        if (err) {
          console.log("err in cb");
        } else {
          res.redirect("/dashboard");
        }
      }
    );
  }
  console.log("after");
});

module.exports = router;
