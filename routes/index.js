const express = require("express");
const router = express.Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/partial", (req, res, next) => {
  res.render("partials/weekly-donut");
});

module.exports = router;
