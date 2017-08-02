var express = require("express");
var path = require("path");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
const expressLayouts = require("express-ejs-layouts");
const { ensureLoggedIn, ensureLoggedOut } = require("connect-ensure-login");
const session = require("express-session");
const bcrypt = require("bcrypt");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const flash = require("connect-flash");

const Song = require("./models/song");
const User = require("./models/user");

const app = express();

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/musspace");

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.set("layout", "layouts/main-layout");
app.use(expressLayouts);

// start a new session

app.use(
  session({
    secret: "our-passport-local-strategy-app",
    resave: true,
    saveUninitialized: true
  })
);

passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

passport.deserializeUser((id, cb) => {
  User.findById(id, (err, user) => {
    if (err) {
      return cb(err);
    }
    cb(null, user);
  });
});

app.use(flash());

passport.use(
  "local-signup",
  new LocalStrategy(
    {
      passReqToCallback: true,
      usernameField: "email"
    },
    (req, email, password, next) => {
      User.findOne(
        {
          email
        },
        (err, user) => {
          if (user) {
            return next(null, false, {
              errMessage: "Error"
            });
          }
          if (err) {
            return next(err);
          } else {
            // Destructure the body
            const { email, password, role } = req.body;
            const hashPass = bcrypt.hashSync(
              password,
              bcrypt.genSaltSync(8),
              null
            );
            const newUser = new User({
              email,
              password: hashPass,
              role
            });

            newUser.save(err => {
              if (err) {
                next(err);
              }
              return next(null, newUser);
            });
          }
        }
      );
    }
  )
);

passport.use(
  "local-login",
  new LocalStrategy({ usernameField: "email" }, (email, password, next) => {
    User.findOne({ email }, (err, user) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return next(null, false);
      }
      if (!bcrypt.compareSync(password, user.password)) {
        return next(null, false);
      }
      return next(null, user);
    });
  })
);

app.use(passport.initialize());
app.use(passport.session());

// set user and message in locals, so we can pass to views
function setCurrents(req, res, next) {
  res.locals.user = req.user;
  res.locals.currentMessage = req.message;
  next();
}
app.use(setCurrents);

const indexRoutes = require("./routes/index");
const authRoutes = require("./routes/auth");
const actionRoutes = require("./routes/actions");
app.use("/", indexRoutes);
app.use("/", authRoutes);
app.use("/actions", actionRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
