const express = require("express");
const router = express.Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/partial", (req, res, next) => {
  res.render("partials/weeklyDonut");
});

router.get("/summary", (req, res, next) => {
  res.render("T1", { arr: [0, 1, 2, 3, 4, 5] });
});

module.exports = router;
