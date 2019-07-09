const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../models/User");

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 12;

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index"), { message: req.flash("error") };
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
  const {
    firstName,
    lastName,
    country,
    birthDate,
    gender,
    email,
    password
  } = req.body;
  const regex = RegExp("/([12]d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]d|3[01]))/");
  console.log(firstName, lastName, country, birthDate, gender, email);
  if (!firstName || !lastName) {
    res.render("index", {
      signMessage: "Please enter first and lastname."
    });
    return;
  } else if (!country === "Country") {
    res.render("index", {
      signMessage: "Please enter your country."
    });
    return;
  } else if (!birthDate || regex.test(birthDate) === false) {
    res.render("index", {
      signMessage: "Enter a valid birthdate."
    });
    return;
  } else if (gender === "select") {
    res.render("index", {
      signMessage: "Select a gender."
    });
    return;
  } else if (!email || !password) {
    res.render("index", {
      signMessage: "Username and password are required."
    });
    return;
  }

  User.findOne({ email }, "email", (err, user) => {
    if (email) {
      res.render("index", { signMessage: "Account exists already." });
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      email,
      password: hashPass,
      firstName,
      lastName,
      country,
      birthDate,
      gender
    });

    newUser
      .save()
      .then(() => {
        res.redirect("/summary");
      })
      .catch(err => {
        res.render("overview", { signMessage: "Something went wrong" });
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
