const express = require("express");
const song = require("../models/song");
//const TYPES = require("../models/song-types");
const router = express.Router();
const passport = require("passport");
const flash = require("connect-flash");
const { ensureLoggedIn, ensureLoggedOut } = require("connect-ensure-login");
const TYPES = {};

router.get("/new", ensureLoggedIn(), (req, res) => {
  res.render("actions/new-music", { types: TYPES });
});

module.exports = router;
