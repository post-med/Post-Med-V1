const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../models/User");

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 12;

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

/* Login */
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/summary",
    failureRedirect: "/",
    failureFlash: true,
    passReqToCallback: true
  })
);

/* Signup */
router.post("/signup", (req, res, next) => {
  const { username, password, birthdate } = req.body;
  if (!username || !password) {
    res.render("/", {
      message: "Username and password are required."
    });
    return;
  }

  User.findOne({ username }, "username", (err, user) => {
    if (user) {
      res.render("/", { message: "The username is already taken." });
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      password: hashPass
    });

    newUser
      .save()
      .then(() => {
        res.redirect("/");
      })
      .catch(err => {
        res.render("/", { message: "Something went wrong" });
      });
  });
});

/* For Testing */
router.get("/partial", (req, res, next) => {
  res.render("partials/weeklyDonut");
});

router.get("/summary", (req, res, next) => {
  res.render("overview", {
    arr: [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16,
      17,
      18,
      19,
      20,
      21,
      22,
      23,
      24,
      25,
      26,
      27,
      28,
      29,
      30,
      31,
      32,
      33,
      34,
      35
    ]
  });
});

module.exports = router;
