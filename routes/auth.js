const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const bcryptSalt = 10;
const passport = require("passport");
const flash = require("connect-flash");

router.get("/signup", (req, res, next) => {
  res.render("auth/signup", { message: req.flash("error") });
});

router.post(
  "/signup",
  passport.authenticate("local-signup", {
    successRedirect: "/login",
    failureRedirect: "/signup",
    failureFlash: true,
    passReqToCallback: true
  })
);

router.get("/login", (req, res, next) => {
  res.render("auth/login", {
    user: res.locals.user,
    errMessage: req.flash("error")
  });
});

router.post(
  "/login",
  passport.authenticate("local-login", {
    successRedirect: "/dashboard",
    failureRedirect: "/login",
    failureFlash: "Wrong username or password",
    passReqToCallback: true
  })
);

module.exports = router;
