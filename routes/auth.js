const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const bcryptSalt = 10;
const passport = require("passport");
const flash = require("connect-flash");
const { ensureLoggedIn, ensureLoggedOut } = require("connect-ensure-login");

router.get("/signup", (req, res, next) => {
  res.render("auth/signup", {
    errMessage: req.flash("error")
  });
});

router.post(
  "/signup",
  passport.authenticate("local-signup", {
    successRedirect: "/login",
    failureRedirect: "/signup",
    failureFlash: "An error occured. Please make sure all fields are filled",
    passReqToCallback: true,
    session: false
  })
);

router.get("/login", (req, res, next) => {
  res.locals.currentMessage = res.locals.account
    ? "Account created succefully. Please login :)"
    : null;
  res.render("auth/login", {
    user: res.locals.user,
    errMessage: req.flash("error"),
    successMessage: res.locals.currentMessage
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

router.get("/logoutofaccount", ensureLoggedIn("/"), (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
