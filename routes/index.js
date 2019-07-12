const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../models/User");
const Activity = require("../models/Activity");
const sortDatesByCalendarWeeks = require("../server-scripts/summaryCalc");

const loginCheck = () => {
  return (req, res, next) => {
    if (req.isAuthenticated()) next();
    //What is happening here?
    else res.redirect("/");
  };
};

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 12; // Ani: Dominik this is just a random number right?

/* GET home page */
router.get("/", (req, res, next) => {
  console.log(req.user);
  res.render("index", { message: req.flash("error"), user: req.user });
});

// Dominik what exactly was the error that you had?

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
  const regex = RegExp(/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/);
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
  } else if (gender === "gender") {
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

  User.findOne({ email }, (err, user) => {
    if (user) {
      res.render("index", { signMessage: "Account exists already." });
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    // Ani: This is the new User Schema.

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
      .save() // Dominik, What does this do exactly?
      .then(() => {
        req.login(newUser, () => res.redirect("/summary"));
      })
      .catch(err => {
        res.render("overview", { signMessage: "Something went wrong" });
      });
  });
});

/* Logout */
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

/* For Testing */
router.get("/partial", (req, res, next) => {
  res.render("partials/weeklyDonut");
});

// This is the redirect for the login checker, Dom added a middle ware function login
// Checker to show the page.
router.get("/summary", loginCheck(), (req, res, next) => {
  Activity.find()
    .then(data => {
      const mutatedData = sortDatesByCalendarWeeks(data);
      res.render("overview", {
        mutatedData,
        user: req.user
      });
    })
    .catch(err => console.log(err));
});

// Ani adding router to the weekly page
router.get("/weeks", loginCheck(), (req, res, next) => {
  const PregTips = [
    "Even when you're still trying to conceive, it's smart to start taking prenatal vitamins. Your baby's neural cord, which becomes the brain and spinal cord, develops within the , so it's important you get essential nutrients – like folic acid, calcium, and iron – from the very start.",
    "Staying active is important for your general health and can help you reduce stress, control your weight, improve circulation, boost your mood, and sleep better. Take a  or walk at least 15-20 minutes every day at a moderate pace, in cool, shaded areas or indoors in order to prevent overheating.",
    "Pilates, yoga, swimming, and walking are also great activities for most pregnant women, but be sure to check with your doctor first before starting any new routine. Aim for 30 minutes of exercise most days of the week. Listen to your body, though, and don't overdo it.",
    "Determined to have a dobula? Counting on that epidural? Write down your wishes and give a copy to everyone involved with the delivery. According to the American Pregnancy Association",
    "attending a childbirth class will help you feel more prepared for delivery. Not only will you have the chance to learn more about childbirth and infant care, but you can ask specific questions and voice any concerns. You'll also become more acquainted with the facility and its staff.",
    "Because of their link to birth defects, miscarriage, and other problems, you should avoid tobacco, alcohol, illicit drugs, and even solvents such as paint thinners and nail polish remover while pregnant. Smoking cigarettes, for example, decreases oxygen flow to your baby",
    "Certain essential oils can cause uterine contractions, especially during the first and second trimester, so check with your massage therapist to make sure only safe ones are being used. On the taboo list: juniper, rosemary, and clary sage.",
    "In addition to drinking 8-10 glasses of water each day, you should eat five or six well-balanced meals with plenty of folate-rich foods like fortified cereals, asparagus, lentils, wheat germ, oranges, and orange juice."
  ];

  res.render("weeks", {
    user: req.user,
    tip: PregTips[Math.floor(Math.random() * PregTips.length)]
  });
});
// Dominik adding router to the weekly page
router.get("/weeks/:id", loginCheck(), (req, res, next) => {
  const id = req.params.id;
  Activity.find().then(data => {
    const wholeData = sortDatesByCalendarWeeks(data);
    const mutatedData = wholeData[id];
    const PregTips = [
      "Even when you're still trying to conceive, it's smart to start taking prenatal vitamins. Your baby's neural cord, which becomes the brain and spinal cord, develops within the , so it's important you get essential nutrients – like folic acid, calcium, and iron – from the very start.",
      "Staying active is important for your general health and can help you reduce stress, control your weight, improve circulation, boost your mood, and sleep better. Take a  or walk at least 15-20 minutes every day at a moderate pace, in cool, shaded areas or indoors in order to prevent overheating.",
      "Pilates, yoga, swimming, and walking are also great activities for most pregnant women, but be sure to check with your doctor first before starting any new routine. Aim for 30 minutes of exercise most days of the week. Listen to your body, though, and don't overdo it.",
      "Determined to have a dobula? Counting on that epidural? Write down your wishes and give a copy to everyone involved with the delivery. According to the American Pregnancy Association",
      "attending a childbirth class will help you feel more prepared for delivery. Not only will you have the chance to learn more about childbirth and infant care, but you can ask specific questions and voice any concerns. You'll also become more acquainted with the facility and its staff.",
      "Because of their link to birth defects, miscarriage, and other problems, you should avoid tobacco, alcohol, illicit drugs, and even solvents such as paint thinners and nail polish remover while pregnant. Smoking cigarettes, for example, decreases oxygen flow to your baby",
      "Certain essential oils can cause uterine contractions, especially during the first and second trimester, so check with your massage therapist to make sure only safe ones are being used. On the taboo list: juniper, rosemary, and clary sage.",
      "In addition to drinking 8-10 glasses of water each day, you should eat five or six well-balanced meals with plenty of folate-rich foods like fortified cereals, asparagus, lentils, wheat germ, oranges, and orange juice."
    ];

    console.log(mutatedData.list);

    res
      .render("weeks", {
        user: req.user,
        summary: mutatedData.summary,
        tableContent: mutatedData.list,
        tip: PregTips[Math.floor(Math.random() * PregTips.length)]
      })
      .catch(err => {
        console.log(err);
      });
  });
});

// Ani adding router to the About page
router.get("/about", (req, res, next) => {
  res.render("about");
});

module.exports = router;
