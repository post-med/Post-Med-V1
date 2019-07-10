const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../models/User");
const Activity = require("../models/Activity");

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 12;

// Role-checker middleware
const roleCheck = () => {
  return (req, res, next) => {
    if (req.user && req.user.role === "doctor") next();
    else res.redirect("/");
  };
};

/* Code Here */
router.post("/addActivity", roleCheck(), (req, res, next) => {
  const treatment = "Preg-246";
  const { category, info, stTi, endTi, stDa, endDa } = req.body;
  const startTime = new Date(`${stDa}T${stTi}:00`);
  const endTime = new Date(`${endDa}T${endTi}:00`);
  console.log(startTime, endTime);
  let mapsLocation = "";
  if (category === "doctor") mapsLocation = "";
  if (category === "select") {
    res.render("auth/addActivity", {
      message: "Please choose type of activity."
    });
    return;
  } else if (
    stDa === "select" ||
    stTi === "select" ||
    endDa === "select" ||
    endTi === "select"
  ) {
    res.render("auth/addActivity", {
      message: "Please fill in all fields for date and Time."
    });
    return;
  } else if (!info) {
    res.render("auth/addActivity", {
      message: "Please add information in the field."
    });
  }

  const newActivity = new Activity({
    category,
    startTime,
    endTime,
    info,
    mapsLocation,
    _treatment: treatment
  });

  newActivity
    .save()
    .then(() => res.redirect("/auth/addActivity"))
    .catch(err => {
      res.render("auth/addActivity", { message: err });
    });
});
/* Code Here */

router.get("/addActivity", roleCheck(), (req, res, next) => {
  console.log(req.user);
  res.render("auth/addActivity", {
    message: req.flash("error"),
    user: req.user
  });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
